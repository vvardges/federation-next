import Modal from "../modal";
import {useState} from "react";
import {submitFeedback} from "../../lib/categories";
import Link from "next/link";

const WriteUsModal = () => {
    const [isModalOpen, toggleModal] = useState(false);

    const [client, setClient] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const [submitted, setSubmitted] = useState(false);

    const onSubmit = () => {
        submitFeedback({client, email, message}).then(response => {
            setSubmitted(true);
        });
    };

    return (
        <>
        <a className="text-info ml-2 cursor-pointer" onClick={toggleModal}>Написать в редакцию</a>
        {isModalOpen &&
            <Modal
             toggle={toggleModal}
             title={"Написать в редакцию"}
             footer={submitted ?
                 <Link href="/">
                     <button type="button" className="btn btn-link btn-lg text-white letter-spacing-lg font-family-condensed">
                         На главную <i className="icon-arrow-right h6 ml-2"/>
                     </button>
                 </Link> :
                 <button type="button" className="btn btn-link btn-lg text-white letter-spacing-lg font-family-condensed" onClick={onSubmit}>
                     Отправить <i className="icon-arrow-right h6 ml-2"/>
                 </button>
             }
            >
                {submitted ?
                    <div className="text-muted">
                        <h3>Спасибо!</h3>
                        <p className="border-top border-secondary">Редакция рассмотрит Ваше обращение в ближайшее время!</p>
                    </div> :
                    <form>
                        <div className="form-group">
                            <input type="text" className="form-control form-control-lg text-white" placeholder="Ваше имя" value={client} onChange={e => setClient(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-control form-control-lg text-white" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <textarea className="form-control form-control-lg text-white" rows="3" placeholder="Напишите нам что-то ;)" value={message} onChange={e => setMessage(e.target.value)}/>
                        </div>
                    </form>
                }
            </Modal>
        }
        </>
    )
};

export default WriteUsModal;