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
                                <HTMLString html={work?.description}/>
                            </div>
                            <div className="work__view__info">
                                <h2>Category</h2>
                                <p>{work?.category}</p>
                                <h2>Due Date</h2>
                                <p>{new Date(work?.dueDate).toLocaleDateString()}</p>
                                <h2>Skills</h2>
                                <ul>
                                    {work?.skills.map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                    ))}
                                </ul>
                                <h2>Tools</h2>
                                <ul>
                                    {work?.tools?.map((tool, index) => (
                                        <li key={index}>{tool}</li>
                                    ))}
                                </ul>
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