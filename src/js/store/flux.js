const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			URL_BASE: "http://127.0.0.1:3000",
			token: localStorage.getItem("token") || "",
			endPoints: ["servicios", "proveedores"],
			servicios: [],
			proveedores: [],
			usuario: [],
			detalles: [],
			pedidos: [],
			contratos: [],
			blackbox:[],
			contratar:[],
			pedidos: JSON.parse(localStorage.getItem("pedidos")) || [],
			contratos: JSON.parse(localStorage.getItem("contratos")) || []
		},
		actions: {
			handleRegister: async (values) => {
				let store = getStore();
				console.log(values, "hola epa");
				let actions = getActions();
				try {
					const response = await fetch(`${store.URL_BASE}/user`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(values)
					})

					if (response.ok) {

						actions.handleLogin(values)

					}
				}
				catch (error) {
					console.log(error);
				}

			},
			handleRegisterServicio: async (values) => {
				let store = getStore();
				console.log(values);
				let actions = getActions();
				try {
					const response = await fetch(`${store.URL_BASE}/agregar`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${store.token}`,
						},
						body: JSON.stringify(values)
					})

					if (response.ok) {

						setStore({
							...store, servicios:[...servicios,data]
						});

					}
				}
				catch (error) {
					console.log(error);
				}

			}
			,

			handleLogin: async (login) => {
				let store = getStore();
				let actions = getActions();
				const response = await fetch(`${store.URL_BASE}/login`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(login)
				})
				let data = await response.json()
				if (response.ok) {
					

					setStore({
						...store, token: data.token
					});
					localStorage.setItem("token", data.token);

					actions.handleGetPedidos();
					actions.handleGetContratos();
					actions.getProfile();

				}
			},

			fetchServicios: async () => {
				let store = getStore();
				try {
					let response = await fetch(`${store.URL_BASE}/${store.endPoints[0]}`);
					let data = await response.json();
					console.log(data)
					console.log(`${store.URL_BASE}/${store.endPoints[0]}`)

					if (response.ok) {
						setStore({
							...store, servicios: data
						})
					}
				} catch (error) {
					console.log(error)
				}
			},

			handleLogOut: async () => {
				let store = getStore();
				try {
					let response = await fetch(`${store.URL_BASE}/logout`, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${store.token}`
						},
					});
					let data = await response.json();
					console.log(data)

					if (response.ok) {
						setStore({
							...store,
							token: ""
						})
						localStorage.removeItem("token");
						localStorage.removeItem("pedidos");
						localStorage.removeItem("contratos");
						
					}
				} catch (error) {
					console.log(error)
				}
			},

			getCategoria: async (categoria) => {
				let store = getStore();
				try {
					let newCategory = categoria.toLowerCase();
					if (categoria.length != "") {
						let response = await fetch(`${store.URL_BASE}/proveedores/${newCategory}`)
						let data = await response.json();
						console.log(data, "general")
						console.log(newCategory)

						if (response.ok) {
							setStore({
								...store, proveedores: data
							})
						}
					}
					// else {
					// 	let response = await fetch(`${store.URL_BASE}/proveedores/${newCategory}`)
					// 	let data = await response.json();
					// 	console.log(data)

					// 	if (response.ok) {
					// 		setStore({
					// 			...store, proveedores: data
					// 		})
					// 	}
					// }
				}

				catch (error) {
					console.log(error)
				}
			},

			getDetalles: async (proveedor) => {
				let actions = getActions()
				let store = getStore();
				actions.handleGetPedidos();
				actions.handleGetContratos();
				try {
					let response = await fetch(`${store.URL_BASE}/user/${proveedor}`)
					let data = await response.json();
					console.log(data, "soy el detalle");

					if (response.ok) {
						setStore({
							...store, detalles: data
						})
					}

				}
				catch (error) {
					console.log(error)
				}

			},

			getProfile: async () => {
				let actions = getActions()
				let store = getStore();
				actions.handleGetPedidos();
				actions.handleGetContratos();
				
				try {
					const response = await fetch(`${store.URL_BASE}/profile`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${store.token}`
						},
						body: JSON.stringify()
					})
					let data = await response.json()
					
					if (response.ok) {
						actions.handleGetPedidos();
						actions.handleGetContratos();
						setStore({
							...store, usuario: data
						})
					
					}
				}

				catch (error) {
					console.log(error)
				};

			},

			handleGetPedidos: async () => {
				let store = getStore();
				
				const response = await fetch(`${store.URL_BASE}/pedidos_pendientes`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${store.token}`
					}
					
				})
				let data = await response.json()
				

				if (response.ok) {
					setStore({
						...store, pedidos: data
					});
					localStorage.setItem("pedidos", JSON.stringify(getStore().pedidos));
				}
			}
				
			,
			
			handleGetContratos: async () => {
				let store = getStore();
				const response = await fetch (`${store.URL_BASE}/contratos_pendientes`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${store.token}`
					}
					})
					let data = await response.json()
					
					
					if (response.ok){
						setStore({
							...store, contratos:data 
						});
						localStorage.setItem("contratos", JSON.stringify(getStore().contratos));
					}
				
			},

			handleEditOrden: async (item, status) => {
				let store = getStore();
				let actions = getActions();
				let box = [];
				if (status == 1 & item.status_orden_recibida == true ){
					 box = {"status_orden_aceptada":item.status_orden_aceptada, "status_orden_cancelada":item.status_orden_cancelada, "status_orden_recibida":false, "id":item.id, "cliente_id":item.cliente.id}
					
				}
				if (status == 1 & item.status_orden_recibida == false ){
					 box = {"status_orden_aceptada":item.status_orden_aceptada, "status_orden_cancelada":item.status_orden_cancelada, "status_orden_recibida":true, "id":item.id, "cliente_id":item.cliente.id}
					
				}

				if (status == 2 & item.status_orden_aceptada == true ){
					 box = {"status_orden_aceptada":false, "status_orden_cancelada":true, "status_orden_recibida":item.status_orden_recibida, "id":item.id, "cliente_id":item.cliente.id}

				}
				if (status == 2 & item.status_orden_aceptada == false ){
					 box = {"status_orden_aceptada":true, "status_orden_cancelada":false, "status_orden_recibida":item.status_orden_recibida, "id":item.id, "cliente_id":item.cliente.id}
				}

				if (status == 3 & item.status_orden_cancelada == true ){
					 box = {"status_orden_aceptada":true, "status_orden_cancelada":false, "status_orden_recibida":item.status_orden_recibida, "id":item.id, "cliente_id":item.cliente.id}

				}
				if (status == 3 & item.status_orden_cancelada == false ){
					 box = {"status_orden_aceptada":false, "status_orden_cancelada":true, "status_orden_recibida":item.status_orden_recibida, "id":item.id, "cliente_id":item.cliente.id}
				}
				console.log(status)
				const response = await fetch (`${store.URL_BASE}/editar_orden_proveedor`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${store.token}`
				},
				body: JSON.stringify(box)
				})
				let data = await response.json()
				if (response.ok){
					actions.handleGetContratos();
					actions.handleGetPedidos();
					console.log("Se edito la orden")
				}

			},


			handleEditPedido: async (item, status) => {
				let store = getStore();
				let actions = getActions();
				let box = [];
				
				if (status == 1 & item.status_orden_cancelada == true ){
					if (item.undefined == "" | item.undefined == null  ){
						box = {"status_orden_finalizada":item.status_orden_finalizada, "status_orden_cancelada":false, "status_orden_recibida":item.status_orden_recibida, "status_orden_aceptada":item.status_orden_aceptada, "id":item.id, "proveedor_id":item.proveedor.id, "comentario":""}
					}
					else{
					box = {"status_orden_finalizada":item.status_orden_finalizada, "status_orden_cancelada":false, "status_orden_recibida":item.status_orden_recibida, "status_orden_aceptada":item.status_orden_aceptada, "id":item.id, "proveedor_id":item.proveedor.id, "comentario":item.undefined}
					}
			   }
			   if (status == 1 & item.status_orden_cancelada == false ){
				if (item.undefined == "" | item.undefined == null  ){
					box = {"status_orden_finalizada":item.status_orden_finalizada, "status_orden_cancelada":true, "status_orden_recibida":item.status_orden_recibida, "status_orden_aceptada":item.status_orden_aceptada, "id":item.id, "proveedor_id":item.proveedor.id, "comentario":""}
				}
					else{
			 box = {"status_orden_finalizada":item.status_orden_finalizada, "status_orden_cancelada":true, "status_orden_recibida":item.status_orden_recibida, "status_orden_aceptada":item.status_orden_aceptada, "id":item.id, "proveedor_id":item.proveedor.id, "comentario":item.undefined}
					}
			   }

			   if (status == 2 & item.status_orden_finalizada == true ){
				if (item.undefined == "" | item.undefined == null  ){
					box = {"status_orden_finalizada":false, "status_orden_cancelada":item.status_orden_cancelada, "status_orden_recibida":item.status_orden_recibida, "status_orden_aceptada":item.status_orden_aceptada, "id":item.id, "proveedor_id":item.proveedor.id, "comentario":""}
				}
				else{
			box = {"status_orden_finalizada":false, "status_orden_cancelada":item.status_orden_cancelada, "status_orden_recibida":item.status_orden_recibida, "status_orden_aceptada":item.status_orden_aceptada, "id":item.id, "proveedor_id":item.proveedor.id, "comentario":item.undefined}
				}
			   }
			   if (status == 2 & item.status_orden_finalizada == false ){
				if (item.undefined == "" | item.undefined == null  ){
					box = {"status_orden_finalizada":true, "status_orden_cancelada":item.status_orden_cancelada, "status_orden_recibida":item.status_orden_recibida, "status_orden_aceptada":item.status_orden_aceptada, "id":item.id, "proveedor_id":item.proveedor.id, "comentario":""}
				}
				else{
			box = {"status_orden_finalizada":true, "status_orden_cancelada":item.status_orden_cancelada, "status_orden_recibida":item.status_orden_recibida, "status_orden_aceptada":item.status_orden_aceptada, "id":item.id, "proveedor_id":item.proveedor.id, "comentario":item.undefined}
				}
		}

			   if (status == 0 ){
			box = {"status_orden_finalizada":item.status_orden_finalizada, "status_orden_cancelada":item.status_orden_cancelada, "status_orden_recibida":item.status_orden_recibida, "status_orden_aceptada":item.status_orden_aceptada, "id":item.id, "proveedor_id":item.proveedor.id, "comentario":item.undefined}
			   
		   }
			
				console.log(box)
				const response = await fetch (`${store.URL_BASE}/editar_orden_cliente/`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${store.token}`
				},
				body: JSON.stringify(box)
				})
				let data = await response.json()
				if (response.ok){
					actions.handleGetContratos();
					actions.handleGetPedidos();
					console.log("Se edito la orden")
				}

			},

			updateProfile: async (profileData) => {
				let store = getStore();
				console.log(profileData, "hola epa");
				let id = store.usuario.id
				
				try {
					const response = await fetch(`${store.URL_BASE}/user/${id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(profileData)
					})
					let data = await response.json();
					console.log(data, "he cambiado el perfil");

				}
				catch (error) {
					console.log(error)
				}
				
			},

			handlePostPedidos: async (values) => {
				let store = getStore();
				const response = await fetch(`${store.URL_BASE}/contratar`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${store.token}`
					},
					body:JSON.stringify(values)
				})
				let data = await response.json()
				console.log(data, "1234")

				if (response.ok) {
					setStore({
						...store, contratar:[...store.contratar,data]
					});
					// localStorage.setItem("contratar", JSON.stringify(getStore().contratar));
				}
			},

			handleRegisterServicio: async (values) => {
				let store = getStore();
				console.log(values);
				let actions = getActions();
				try {
					const response = await fetch(`${store.URL_BASE}/agregar`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${store.token}`,
						},
						body: JSON.stringify(values)
					})

					if (response.ok) {

						setStore({
							...store, servicios:[...servicios,data]
						});

					}
				}
				catch (error) {
					console.log(error);
				}
			},

			handleEvaluacion: async (item, rating) => {
				let store = getStore();
				let actions = getActions();
				console.log(item)
				let box = {"proveedor_id":item.proveedor.id, "nombre_tipo_servicio":item.orden_detalle_servicio.nombre_tipo_servicio, "resultado_evaluacion":rating}
			
				console.log(box)
				const response = await fetch (`${store.URL_BASE}/evaluar/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${store.token}`
				},
				body: JSON.stringify(box)
				})
				let data = await response.json()
				if (response.ok){
					actions.handleGetContratos();
					actions.handleGetPedidos();
					console.log("Se evaluo al Proveedor")
				}

			}

	}
	}
};
;

export default getState;
