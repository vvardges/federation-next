import Link from "next/link";

export default function Header() {
    return (
        <div className="sticky-top">
            <nav className="navbar text-white bg-dark smallest font-family-roboto">
                <div className="container letter-spacing-md">
                    <div className="float-left text-white">
                        <i className="icon-cloud"/> +6°C МОСКВА
                    </div>
                    <div className="float-right d-none d-xl-block">
                        <a className="text-white ml-2" href="./about.html">О журнале</a>
                        <a className="text-info ml-2" href="" data-toggle="modal" data-target="#exampleModal">Написать в редакцию</a>
                    </div>
                </div>
            </nav>
            <nav className="navbar navbar-light navbar-expand-xl bg-white border-bottom">
                <div className="container">
                    <button className="navbar-toggler text-dark border-0" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="icon-navbar-toggler"/>
                    </button>
                    <a className="navbar-brand d-xl-none mx-auto" href="#">
                        <img src="/img/logo.png" className="align-middle" alt=""/>
                    </a>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <div className="d-flex flex-column flex-xl-row justify-content-between small font-family-condensed w-100">
                            <ul className="navbar-nav justify-content-between w-100">
                                <li className="nav-item">
                                    <a className="nav-link text-primary" href="./super-rubric.html">Коронавирус</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-dark" href="./rubric.html">Личные деньги</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-dark" href="./rubric.html">Я предприниматель</a>
                                </li>
                            </ul>
                            <Link href="/">
                                <a className="navbar-brand px-3 d-none d-xl-block">
                                    <img src="/img/logo.png" className="align-top" alt=""/>
                                </a>
                            </Link>
                            <ul className="navbar-nav justify-content-between w-100">
                                <li className="nav-item">
                                    <a className="nav-link text-dark" href="./rubric.html">Моё здоровье</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-dark" href="./rubric.html">Уровень жизни</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-dark" href="./404.html">Не найден</a>
                                </li>
                                <li className="nav-item d-xl-none">
                                    <a className="nav-link text-dark" href="./about.html">О журнале</a>
                                </li>
                                <li className="nav-item d-xl-none">
                                    <a className="nav-link text-dark" data-toggle="modal" data-target="#exampleModal">Написать в редакцию</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}