import {useLocation} from "react-router-dom";
import {apiRequest} from "../../utils/api.ts";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import HTMLString from "../../components/HTMLString/HTMLString.tsx";
import "./Work.scss"

interface Testimonial {
    name: string;
    feedback: string;
    date: Date;
}

export interface Work {
    _id: string;
    title: string;
    description: string;
    skills: string[];
    dueDate: Date;
    budget: number;
    imageCover: string;
    images: string[];
    author: string;
    status: 'In Progress' | 'Completed' | 'On Hold';
    projectUrl?: string;
    repositoryUrl?: string;
    client?: string;
    testimonials?: Testimonial[];
    category?: string;
    tools?: string[];
    createdAt?: Date;
    updatedAt?: Date;
    visibility?: 'Public' | 'Private';
    featured?: boolean;
    tags?: string[];
}

const Work = () => {
    const location = useLocation()
    const token = useSelector((state: RootState) => state.auth.token);
    const [work, setWork] = useState<Work | undefined>(undefined);

    const fetchData = async () => {
        try {
            const response = await apiRequest({endpoint: `/works/${location.pathname.split("/")[2]}`}, token);
            const result = await response.json();
            // shuffle and keep only 3 results
            // result.sort(() => Math.random() - 0.5);
            setWork(result);
        } catch (err: unknown) {
            console.error('Error fetching data:');
            console.error(err)
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {work !== undefined && (
                <div className={"work__view"}>
                    <div className="work__view__container">
                        <h1>{work?.title}</h1>
                        <div className="work__view__cover">
                            <img src={work?.imageCover} alt={work?.title}/>
                        </div>
                        <div className="work__view__details">
                            <div className="work__view__description">
                                <h2>Description</h2>
                                <br/>
                                <HTMLString html={work?.description}/>
                            </div>
                            <div className="work__view__info">
                                <div className="work__view__info__item">
                                    <h2>Catégorie</h2>
                                    <div className="work__view__info__item__value">
                                        <p>{work?.category}</p>
                                    </div>
                                </div>
                                <div className="work__view__info__item">
                                    <h2>Date de rendu</h2>
                                    <div className="work__view__info__item__value">
                                        <p>{new Date(work?.dueDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="work__view__info__item">
                                    <h2>Compétences</h2>
                                    <div className={"work__view__info__item__value"}>
                                        <ul>
                                            {work?.skills.map((skill, index) => (
                                                <li key={index}>{skill}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="work__view__info__item">
                                    <h2>Outils</h2>
                                    <div className={"work__view__info__item__value"}>
                                        <ul>
                                            {work?.tools?.map((tool, index) => (
                                                <li key={index}>{tool}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {work === undefined && (
                <div>
                    <h1>Loading...</h1>
                </div>
            )}
        </>
    )
}

export default Work;