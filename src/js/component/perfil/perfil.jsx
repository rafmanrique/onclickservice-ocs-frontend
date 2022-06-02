import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Context } from '../../store/appContext';
import { FaWindowClose, FaCheck, FaPencilAlt, FaStar } from 'react-icons/fa'
import './perfil.css';

export const Perfil = () => {
  // var user = "Cristhian";
  // console.log(user)
  let initialState = {
    nombre: "",
    email: "",
    direccion: "",
    telefono: ""
  }
  const [rating, setRating] = useState(null)

  const [hover, setHover] = useState(null)

  const { store, actions } = useContext(Context);

  const [modalData, setModalData] = useState([]);

  const [profileData, setProfileData] = useState(initialState);

  const handleChange = event => {

    setProfileData({
      ...profileData, [event.target.name]: event.target.value
    });
  };


  useEffect(() => {
    actions.getProfile();
  }, []);

  return (




    <>

      {/* modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title" id="exampleModalLabel">
                Editar datos
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="col-form-label">Nombre y apellido:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    name="nombre"
                    value={profileData.nombre}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Ciudad/Estado</label>
                  <input
                    className="form-control"
                    id="exampleFormControlSelect1"
                    name="direccion"
                    value={profileData.direccion}
                    onChange={handleChange}
                  >
                  </input>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Telefono</label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-pagina-web"
                    name="telefono"
                    value={profileData.telefono}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Subir curriculum</label>
                  <br />
                  <input
                    type="file"
                    className="form-control-file"
                    id="exampleFormControlFile1"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button type="button" className="btn actualizar" data-bs-dismiss="modal"
                onClick={() => actions.updateProfile(profileData)}>
                Actualizar
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* modal 2 */}
      <div
        className="modal fade"
        id="exampleModal2"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body px-5">
              <div className="text-center my-3">
                <i className="fa-solid fa-gear fa-5x my-2"></i>
                <h3>Modificar el Status del Contrato</h3>
                <button type="button" className="mx-2 orden-servicios"
                  onClick={() => { actions.handleEditOrden(modalData, 1) }}>
                  Servicio Recibido
                </button>
                <button type="button" className="mx-2 orden-servicios"
                  onClick={() => { actions.handleEditOrden(modalData, 2) }}>
                  Servicio Aceptado
                </button>
                <button type="button" className="mx-2 orden-servicios"
                  onClick={() => { actions.handleEditOrden(modalData, 3) }}>
                  Servicio Cancelado
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => { actions.handleGetContratos(), actions.handleGetPedidos() }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* modal 3 */}
      <div
        className="modal fade"
        id="exampleModal3"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body px-5">
              <div className="text-center my-3">
                <i className="fa-solid fa-gear fa-5x my-2"></i>
                <h3>Edita y/o Agrega un comentario sobre tu Pedido</h3>
              </div>
              <div className="pb-3 d-flex justify-content-center">
                <button type="button" className="mx-2 orden-servicios"
                  onClick={() => { actions.handleEditPedido(modalData, 1) }}>
                  Servicio Cancelado
                </button>
                <button type="button" className="mx-2 orden-servicios"
                  onClick={() => { actions.handleEditPedido(modalData, 2) }}>
                  Servicio Finalizado
                </button>
              </div>
              <div className="mb-3">
                <textarea className="form-control" type="text w-100" name="comment" onChange={(event) => setModalData({ ...modalData, [event.target.comment]: event.target.value })}></textarea>
              </div>
              <button type="button" className="btn enviar-comentario" onClick={() => actions.handleEditPedido(modalData, 0)}>Enviar</button>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => { actions.handleGetContratos(), actions.handleGetPedidos() }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* modal 4 */}
      <div
        className="modal fade"
        id="exampleModal4"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body px-5">
              <div className="text-center my-3">
                <i className="fa-solid fa-gear fa-5x my-2"></i>
                <h3>Califica al proveedor</h3>
              </div>
              <div className="pb-3 d-flex justify-content-center">
                <div>
                  {[...Array(5)].map((star, i) => {

                    const ratingValue = i + 1;

                    return (

                      <label>
                        <input
                          type="radio"
                          name="rating"
                          value={ratingValue}
                          onClick={() => setRating(ratingValue)}
                        />

                        <FaStar
                          className="star"
                          color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                          size={50}
                          onMouseEnter={() => setHover(ratingValue)}
                          onMouseLeave={() => setHover(null)} />
                      </label>);
                  })}
                </div>
              </div>
              <div className="mb-3">
                <textarea className="form-control" type="text w-100" name="comment" onChange={(event) => setModalData({ ...modalData, [event.target.comment]: event.target.value })}></textarea>
              </div>
              <button type="button" className="btn enviar-comentario" data-bs-dismiss="modal" onClick={() =>  {actions.handleEvaluacion(modalData, rating) }}>Calificar</button>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* desarrollo página  */}
      <div className="container pt-5">
        <div className="row">
          <div className="col-12 col-md-2 "></div>
          <div className="col-12 col-md-8 box-perfil px-0 pt-0 ">
            <div className="fondo-perfil"></div>
            <div className="row d-flex align-items-center px-5 pb-3">
              <div className="col-5 foto-perfil">
                <img src={store.usuario.imagen} />
              </div>
              <div className="col-7 date-perfil pt-4">
                <h2>{store.usuario.nombre}</h2>
                <h3>{store.usuario.email}</h3>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-2 "></div>
          <div className="col-12 col-md-2 "></div>
          <div className="col-12 col-md-8 mt-4 informacion-perfil">
            <div
              className="accordion accordion-flush"
              id="accordionFlushExample"
            >
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingOne">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    <i className="fa-solid fa-user fa-2x mx-2"></i> Datos
                    personales
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    <div className="row">
                      <div className="col-5 mt-3">
                        <h4>Nombre y apellido</h4>
                      </div>
                      <div className="col-7 datos-perfil mt-3">
                        <p>{store.usuario.nombre}</p>
                      </div>
                      <div className="col-5 mt-3">
                        <h4>Correo</h4>
                      </div>
                      <div className="col-7 datos-perfil mt-3">
                        <p>{store.usuario.email}</p>
                      </div>
                      <div className="col-5 mt-3">
                        <h4>Ciudad/Estado</h4>
                      </div>
                      <div className="col-7 datos-perfil mt-3">
                        <p>{store.usuario.direccion}</p>
                      </div>
                      <div className="col-5 mt-3">
                        <h4>Telefono</h4>
                      </div>
                      <div className="col-7 datos-perfil mt-3">
                        <p>{store.usuario.telefono}</p>
                      </div>

                      <div className="col-2">
                        <button
                          type="button"
                          className="edita-tu-perfil"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          data-bs-whatever="@getbootstrap"
                        >
                          <i className="fa-solid fa-pencil fa-2x edit-perfil"></i>{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingFive">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFive"
                    aria-expanded="false"
                    aria-controls="flush-collapseFive"
                  >
                    <i className="fa-solid fa-briefcase fa-2x mx-2"></i>{" "}
                    Servicios solicitados
                  </button>
                </h2>
                <div
                  id="flush-collapseFive"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingFiver"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body orden-servicio">
                    <div className="row d-flex justify-content-center ">
                      {store.contratos.length == ""
                        ? "No tienes servicios solicitados"
                        : store.contratos.map((item) => {
                          return (
                            <>
                              <div className="col-10 ">
                                <p className="ms-2 d-flex">
                                  {" "}
                                  <p>
                                    {"Cliente: " + item.cliente.nombre +
                                      " " +
                                      " - Servicio " +
                                      item.orden_detalle_servicio.nombre}<br></br> {" Aceptado: "} {item.status_orden_aceptada === true ? <FaCheck /> : <FaWindowClose />} {" Cancelado: "} {item.status_orden_cancelada === true ? <FaCheck /> : <FaWindowClose />}  {" Recibido: "} {item.status_orden_recibida === true ? <FaCheck /> : <FaWindowClose />}
                                    {" Finalizado: "} {item.status_orden_finalizada === true ? <FaCheck /> : <FaWindowClose />}
                                    <br></br> {"Comentarios: "} {item.comentario != null ? item.comentario : <FaWindowClose />}</p>
                                </p>
                              </div>
                              <div className="col-2 d-flex pt-3 ">
                                <button
                                  type="button"
                                  className="btn status w-100 h-50 "
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal2"
                                  onClick={() => { setModalData(item) }}
                                >
                                  <FaPencilAlt />
                                </button>
                              </div>

                            </>

                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    <i className="fa-solid fa-shield-halved fa-2x mx-2"></i>{" "}
                    Seguridad
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingTwo"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    Placeholder content for this accordion, which is intended to
                    demonstrate the <code>.accordion-flush</code> class. This is
                    the second item's accordion body. Let's imagine this being
                    filled with some actual content.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree"
                  >
                    <i className="fa-solid fa-location-dot fa-2x mx-2"></i>{" "}
                    Direcciones
                  </button>
                </h2>
                <div
                  id="flush-collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingThree"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    Placeholder content for this accordion, which is intended to
                    demonstrate the <code>.accordion-flush</code> class. This is
                    the third item's accordion body. Nothing more exciting
                    happening here in terms of content, but just filling up the
                    space to make it look, at least at first glance, a bit more
                    representative of how this would look in a real-world
                    application.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingFour">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFour"
                    aria-expanded="false"
                    aria-controls="flush-collapseFour"
                  >
                    <i className="fa-solid fa-bell-concierge fa-2x mx-2"></i>{" "}
                    Ordenes de servicios
                  </button>
                </h2>
                <div
                  id="flush-collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingFour"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body orden-servicio">
                    <div className="row d-flex justify-content-center ">

                      {store.pedidos.length == ""
                        ? "No tienes ordenes de servicio"
                        : store.pedidos.map((item, i) => {
                          return (
                            <>
                              <div className="col-10 " key={i}>
                                <p className="ms-2 d-flex">
                                  {" "}
                                  <p>
                                    {"Proveedor: " + item.proveedor.nombre +
                                      " " +
                                      " - Servicio: " +
                                      item.orden_detalle_servicio.nombre}<br></br>{" Telefono: " +
                                        item.proveedor.telefono}<br></br> {" Aceptada: "} {item.status_orden_aceptada === true ? <FaCheck /> : <FaWindowClose />} {" Cancelada: "} {item.status_orden_cancelada === true ? <FaCheck /> : <FaWindowClose />}  {" Recibida: "} {item.status_orden_recibida === true ? <FaCheck /> : <FaWindowClose />}
                                    {" Finalizada: "} {item.status_orden_finalizada === true ? <FaCheck /> : <FaWindowClose />}
                                    <br></br> {"Comentarios: "} {item.comentario != null ? item.comentario : <FaWindowClose />}</p>
                                </p>
                              </div>
                              <div className="col-2 d-flex pt-3 ">
                                <button
                                  type="button"
                                  className="btn status w-200 h-50 "
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal3"
                                  onClick={() => { setModalData(item) }}
                                >
                                  <FaPencilAlt />
                                </button>
                                <button
                                  type="button"
                                  className="btn status w-200 h-50 mx-2"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal4"
                                  onClick={() => { setModalData(item) }}
                                >
                                  <FaStar />
                                </button>
                              </div>

                            </>

                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingSix">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseSix"
                    aria-expanded="false"
                    aria-controls="flush-collapseSix"
                  >
                    <i className="fa-solid fa-user-tie fa-2x ml-2"></i>{" "}
                    Servicios
                  </button>
                </h2>
                <div
                  id="flush-collapseSix"
                  className="accordion-collapse collapse perfil-servicios"
                  aria-labelledby="flush-headingSix"
                  data-bs-parent="#accordionFlushExample"
                >
                  {store.usuario && store.usuario.servicio <= 0 ?

                    <>
                      <h4>¿{store.usuario.nombre} no posees ningun servicio? ¿Qué estas esperando para ser parte de nuestros profesionales?</h4>
                    </>

                    :

                    store.usuario.servicio?.map((item) => {
                      return (


                        <p key={item.id} className="ms-2 d-flex mt-2"> <span>{item.nombre}</span> </p>
                      )
                    })



                  }
                  <p>¿Deseas agregar tus servicios? <Link to="/registerservicio"> Click aqui</Link> </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-2 "></div>
        </div>
      </div>
    </>
  );
};
