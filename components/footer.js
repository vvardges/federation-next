export default function Footer() {
    return (
        <div className="border-top border-black bg-secondary text-center font-family-condensed py-1">
            <div className="container">
                <img src="/img/logo.png" className="mt-3" alt=""/>
                <hr/>
                <div className="mb-4">
                    <a href="#" className="badge rounded-circle bg-white text-black-50 py-1 mx-1"><i className="icon-facebook lead"/></a>
                    <a href="#" className="badge rounded-circle bg-white text-black-50 py-1 mx-1"><i className="icon-telegram lead"/></a>
                    <a href="#" className="badge rounded-circle bg-white text-black-50 py-1 mx-1"><i className="icon-twitter lead"/></a>
                    <a href="#" className="badge rounded-circle bg-white text-black-50 py-1 mx-1"><i className="icon-vk lead"/></a>
                </div>
                <p className="small mb-3 letter-spacing-lg">Полное или частное использование материалов возможно только с разрешением редакции.</p>
                <small className="text-muted">© 2020. Все права защищены.</small>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header text-center bg-black">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <i className="icon-close d-none d-lg-block"/>
                                <i className="icon-arrow-left d-lg-none"/>
                            </button>
                            <small className="modal-title font-family-roboto letter-spacing-xl text-white-50 mx-auto">Написать
                                в редакцию</small>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg text-white"
                                           aria-label="name" placeholder="Ваше имя"/>
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control form-control-lg text-white"
                                           aria-label="email" placeholder="E-mail"/>
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control form-control-lg text-white" rows="3" aria-label="message" placeholder="Напишите нам что-то ;)"/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer pt-0">
                            <button type="button" className="btn btn-link btn-lg text-white letter-spacing-lg">Отправить <i className="icon-arrow-right h6 ml-2"/></button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModal2" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header text-center bg-black">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <i className="icon-close d-none d-lg-block"/>
                                <i className="icon-arrow-left d-lg-none"/>
                            </button>
                            <small
                                className="modal-title font-family-roboto letter-spacing-xl text-white-50 smallest mx-auto">ДОБАВИТЬ
                                РУБРИКУ</small>
                        </div>
                        <div className="modal-body">
                            <ul className="list-unstyled h4 font-family-condensed font-weight-normal text-muted">
                                <li className="list-group-item">Коронавирус</li>
                                <li className="list-group-item text-white">
                                    Личные деньги
                                    <button className="btn btn-sm btn-link text-white"><i className="icon-times-circle"/></button>
                                </li>
                                <li className="list-group-item">Я предприниматель</li>
                                <li className="list-group-item">Моё здоровье</li>
                                <li className="list-group-item">Уровень жизни</li>
                                <li className="list-group-item">Ты и закон</li>
                            </ul>
                        </div>
                        <div className="modal-footer pt-0">
                            <button type="button" className="btn btn-link btn-lg text-white letter-spacing-lg">Фильтровать <i className="icon-arrow-right h6 ml-2"/></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}