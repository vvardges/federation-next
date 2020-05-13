import Link from "next/link";

export default function Header({ isCategory }) {
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
                                    <Link href="/category/[id]" as="/category/business">
                                        <a className="nav-link text-dark">Бизнес</a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/category/[id]" as="/category/technology">
                                        <a className="nav-link text-dark">Технологии</a>
                                    </Link>
                                </li>
                            </ul>
                            <Link href="/">
                                <a className="navbar-brand px-3 d-none d-xl-block">
                                    <img src="/img/logo.png" className="align-top" alt=""/>
                                </a>
                            </Link>
                            <ul className="navbar-nav justify-content-between w-100">
                                <li className="nav-item">
                                    <Link href="/category/[id]" as="/category/health">
                                        <a className="nav-link text-dark">Здорове</a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/category/[id]" as="/category/sports">
                                        <a className="nav-link text-dark">Спорт</a>
                                    </Link>
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
            {isCategory && <nav className="navbar navbar-dark navbar-expand-xl bg-dark">
                <div className="container">
                    <h2 className="text-white font-weight-normal mb-0 mx-auto">Личные деньги</h2>
                    <div className="collapse navbar-collapse ml-3" id="navbarTogglerDemo02">
                        <ul className="navbar-nav font-family-condensed font-weight-normal letter-spacing-sm h4 w-100 justify-content-between">
                            <li className="nav-item">
                                <a className="nav-link" href="./subrubric.html">Кризис 2.0</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="./subrubric.html">Пандемия</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="./subrubric.html">Реформы</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="./subrubric.html">Самоизоляция</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="./subrubric.html">Госпомощь</a>
                            </li>
                        </ul>
                        <button className="btn btn-lg btn-link text-white"><i className="icon-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </nav>}
        </div>
    );
}