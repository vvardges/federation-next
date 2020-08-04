import Modal from "../modal";
import React, {useState} from "react";
import {submitFeedback} from "../../lib/categories";
import {useRouter} from "next/router";

const WriteUsModal = ({ toggleModal }) => {
    const [client, setClient] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const [errors, setErrors] = useState({});

    const [submitted, setSubmitted] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const onSubmit = () => {
        setIsSending(true);

        submitFeedback({client, email, message}).then(response => {
            setIsSending(false);
            const errors = response.errors;
            errors ? setErrors(errors) : setSubmitted(true);
        });
    };

    const router = useRouter();

    const backToHomePage = () => {
        toggleModal();

        router.push({
            pathname: "/"
        })
    };

    return (
        <Modal
            toggle={toggleModal}
            title={"Написать в редакцию"}
            footer={submitted ?
                <button type="button" className="btn btn-link btn-lg text-white letter-spacing-lg font-family-condensed" onClick={backToHomePage}>
                    На главную <i className="icon-arrow-right h6 ml-2"/>
                </button> :
                <button type="button" className="btn btn-link btn-lg text-white letter-spacing-lg font-family-condensed" onClick={onSubmit} disabled={isSending}>
                    Отправить <i className="icon-arrow-right h6 ml-2"/>
                </button>
            }
        >
            {submitted ?
                <div className="text-gray text-center py-5">
                    <h3 className="mb-4" style={{fontSize: 36}}>Спасибо!</h3>
                    <h5 className="border-top border-gray p-2 mb-5 d-inline-block font-weight-normal">Редакция рассмотрит Ваше обращение в ближайшее время!</h5>
                </div> :
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control form-control-lg text-white" placeholder="Ваше имя" value={client} onChange={e => setClient(e.target.value)}/>
                        {errors.client && <div className="invalid-feedback d-block">{errors.client[0]}</div>}
                    </div>
                    <div className="form-group">
                        <input type="email" className={`form-control form-control-lg ${errors.email ? "text-danger border-danger" : "text-white"}`} placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)}/>
                        {errors.email && <div className="invalid-feedback d-block">{errors.email[0]}</div>}
                    </div>
                    <div className="form-group">
                        <textarea className="form-control form-control-lg text-white" rows="3" placeholder="Напишите нам что-то ;)" value={message} onChange={e => setMessage(e.target.value)}/>
                        {errors.message && <div className="invalid-feedback d-block">{errors.message[0]}</div>}
                    </div>
                </form>
            }
        </Modal>
    )
};

export default WriteUsModal;