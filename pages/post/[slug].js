import Layout from '../../components/layout';

import Popular from "../../components/posts/popular";

import {getPostData} from "../../lib/categories";
import PostsByCategory from "../../components/post/postsByCategory";

export async function getServerSideProps({ params }) {
    const data = await getPostData(params.slug);

    return {
        props: {
            data: data
        },
    }
}

function Content({ data }) {
    const {type, value, author} = data;
    switch (type) {
        case "heading":
            return <h4 className="mt-4">{value}</h4>;
        case "paragraph":
            return <p className="pl-lg-5">{value}</p>;
        case "quote":
            return (
                <div className="my-4 bg-secondary p-3 pl-4">
                    <p className="font-italic">{value}</p>
                    <p className="text-right mb-0">{author}</p>
                </div>
            );
        case "lead":
            return <p className="my-4 bg-secondary p-3 border-left border-md">{value}</p>;
        default:
            return <p>{value}</p>;
    }
}

export default function Slug({ data }) {
    const {general, popularArticles, content, articlesByCategories} = data;
    return (
        <Layout article>
            <div className="pl-xl-5">
                <div className="row">
                    <div className="col-lg-8 col-xl-9">
                        <div className="d-flex flex-column flex-md-row justify-content-md-between">
                            <h4 className="card-subtitle font-family-condensed letter-spacing-lg font-weight-normal mb-2">{general.heading.title}</h4>
                            <small className="font-family-condensed letter-spacing-lg">{general.published_diff_for_humans}</small>
                        </div>
                        <h1 className="my-lg-3">{general.title}</h1>

                        <div className="d-flex justify-content-between align-items-center">
                            <div className="mb-1">
                                <a href="#" className="badge rounded-circle bg-secondary text-black-50 py-1 mr-1"><i className="icon-facebook lead"/></a>
                                <a href="#" className="badge rounded-circle bg-secondary text-black-50 py-1 mr-1"><i className="icon-telegram lead"/></a>
                                <a href="#" className="badge rounded-circle bg-secondary text-black-50 py-1 mr-1"><i className="icon-twitter lead"/></a>
                                <a href="#" className="badge rounded-circle bg-secondary text-black-50 py-1 mr-1"><i className="icon-vk lead"/></a>
                            </div>

                            <small className="font-family-condensed text-muted"><i className="icon-eye"/> {general.number_of_view}</small>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-8 col-xl-9 mb-4">
                        <div className="border-top border-black border-md pt-1">
                            <p className="font-family-condensed letter-spacing-lg small">{general.author.name}</p>
                            <img src={general.img_original} className="w-100" alt="..."/>
                            {content && content.map((data, index) =>
                                <Content data={data} key={index}/>
                            )}
                                {/*<p className="my-4 bg-secondary p-3 border-left border-md">Таким образом сложившаяся*/}
                                {/*    структура организации позволяет выполнять важные задания по разработке модели*/}
                                {/*    развития. Значимость этих проблем настолько очевидна, что дальнейшее развитие*/}
                                {/*    различных форм деятельности позволяет выполнять важные задания по разработке*/}
                                {/*    существенных финансовых и административных условий.</p>*/}
                                {/*<h4>Ваш шедевр готов!</h4>*/}
                                {/*<p className="pl-lg-5">*/}
                                {/*    С другой стороны дальнейшее развитие различных форм деятельности представляет собой*/}
                                {/*    интересный эксперимент проверки новых предложений. Не следует, однако забывать, что*/}
                                {/*    рамки и место обучения кадров обеспечивает широкому кругу (специалистов) участие в*/}
                                {/*    формировании новых предложений. Повседневная практика показывает, что новая модель*/}
                                {/*    организационной деятельности в значительной степени обуславливает создание модели*/}
                                {/*    развития. Равным образом сложившаяся структура организации обеспечивает широкому*/}
                                {/*    кругу (специалистов) участие в формировании направлений прогрессивного развития.*/}
                                {/*    Задача организации, в особенности же постоянное информационно-пропагандистское*/}
                                {/*    обеспечение нашей деятельности в значительной степени обуславливает создание системы*/}
                                {/*    обучения кадров, соответствует насущным потребностям. Таким образом рамки и место*/}
                                {/*    обучения кадров способствует подготовки и реализации модели развития.*/}
                                {/*    <br/><br/>Таким образом сложившаяся структура организации позволяет выполнять важные*/}
                                {/*        задания по разработке модели развития. Значимость этих проблем настолько*/}
                                {/*        очевидна, что дальнейшее развитие различных форм деятельности позволяет*/}
                                {/*        выполнять важные задания по разработке существенных финансовых и*/}
                                {/*        административных условий.*/}
                                {/*</p>*/}
                                {/*<p className="my-4 bg-secondary p-3 border-left border-md">Таким образом сложившаяся*/}
                                {/*    структура организации позволяет выполнять важные задания по разработке модели*/}
                                {/*    развития. Значимость этих проблем настолько очевидна, что дальнейшее развитие*/}
                                {/*    различных форм деятельности позволяет выполнять важные задания по разработке*/}
                                {/*    существенных финансовых и административных условий.</p>*/}
                                {/*<h4>А дальше: “Товарищи!”</h4>*/}
                                {/*<p className="pl-lg-5">*/}
                                {/*    постоянное информационно-пропагандистское обеспечение нашей деятельности*/}
                                {/*    обеспечивает широкому кругу (специалистов) участие в формировании системы обучения*/}
                                {/*    кадров, соответствует насущным потребностям. Идейные соображения высшего порядка, а*/}
                                {/*    также начало повседневной работы по формированию позиции требуют от нас анализа*/}
                                {/*    модели развития. Идейные соображения высшего порядка, а также укрепление и развитие*/}
                                {/*    структуры требуют от нас анализа новых предложений. Равным образом постоянное*/}
                                {/*    информационно-пропагандистское обеспечение нашей деятельности позволяет выполнять*/}
                                {/*    важные задания по разработке новых предложений. Разнообразный и богатый опыт рамки и*/}
                                {/*    место обучения кадров позволяет выполнять важные задания по разработке позиций,*/}
                                {/*    занимаемых участниками в отношении поставленных задач.*/}
                                {/*    <br/><br/>Разнообразный и богатый опыт постоянный количественный рост и сфера нашей*/}
                                {/*        активности обеспечивает широкому кругу (специалистов) участие в формировании*/}
                                {/*        позиций, занимаемых участниками в отношении поставленных задач. Не следует,*/}
                                {/*        однако забывать, что новая модель организационной деятельности позволяет*/}
                                {/*        выполнять важные задания по разработке дальнейших направлений развития.*/}
                                {/*</p>*/}
                                {/*<p className="my-4 bg-secondary p-3 pl-4 font-italic">*/}
                                {/*    Трудно в новом формате будет тем, в чьей работе решающее значение имеет личный*/}
                                {/*    контакт, — например, сфере продаж, развлекательной сфере. Также в тех случаях, где*/}
                                {/*    требуется проверка «с глазу на глаз» (строительство, дизайн помещений, аудит и тому*/}
                                {/*    подобное).*/}
                                {/*</p>*/}
                                {/*<p className="pl-lg-5">*/}
                                {/*    Задача организации, в особенности же начало повседневной работы по формированию*/}
                                {/*    позиции позволяет оценить значение существенных финансовых и административных*/}
                                {/*    условий. Разнообразный и богатый опыт начало повседневной работы по формированию*/}
                                {/*    позиции влечет за собой процесс внедрения и модернизации существенных финансовых и*/}
                                {/*    административных условий. Идейные соображения высшего порядка, а также начало*/}
                                {/*    повседневной работы по формированию позиции требуют от нас анализа соответствующий*/}
                                {/*    условий активизации. Разнообразный и богатый опыт сложившаяся структура организации*/}
                                {/*    позволяет оценить значение направлений прогрессивного развития.*/}
                                {/*</p>*/}
                        </div>
                    </div>
                    <div className="col-lg-4 col-xl-3">
                        <Popular posts={popularArticles} />
                    </div>
                </div>
                <div className="d-flex flex-column flex-sm-row justify-content-sm-between pt-1 border-top mx-lg-4 mb-3">
                    <div className="mb-1">
                        <a href="#" className="badge rounded-circle bg-secondary text-black-50 py-1 mr-1"><i className="icon-facebook lead"/></a>
                        <a href="#" className="badge rounded-circle bg-secondary text-black-50 py-1 mr-1"><i className="icon-telegram lead"/></a>
                        <a href="#" className="badge rounded-circle bg-secondary text-black-50 py-1 mr-1"><i className="icon-twitter lead"/></a>
                        <a href="#" className="badge rounded-circle bg-secondary text-black-50 py-1 mr-1"><i className="icon-vk lead"/></a>
                    </div>
                    <div className="font-family-condensed letter-spacing-lg">
                        <span className="badge badge-secondary">#Москва</span>
                        <span className="badge badge-secondary">#Бизнесдома</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-8 col-xl-9 mb-4">
                        <PostsByCategory categories={articlesByCategories} />
                    </div>
                    <div className="col-lg-4 col-xl-3">
                        <div className="bg-secondary p-2">
                            <Popular posts={popularArticles} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}