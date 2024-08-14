import {apiRequest} from "../../utils/api.ts";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import "./Works.scss"
import {Link} from "react-router-dom";
import {ArrowRight} from "react-feather";
import Button from "../../components/buttons/Button";
import {useNavigate} from "react-router-dom";


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


const Works = ({limit = null, section = false}: { limit: number | null, section: boolean }) => {
    const token = useSelector((state: RootState) => state.auth.token);
    const [works, setWorks] = useState<Work[]>([]);
    const navigate = useNavigate()

    const fetchData = async () => {
        try {
            const response = await apiRequest({endpoint: '/works'}, token);
            const result = await response.json();
            // shuffle and keep only 3 results
            // result.sort(() => Math.random() - 0.5);
            if (limit) result.splice(limit);
            setWorks(result);
        } catch (err: unknown) {
            console.error('Error fetching data:');
            console.error(err)
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className={`works ${section ? 'section' : ''}`}>
            <div className="works-header">
                <h1>Works</h1>
                {section && (
                    <Link to={"/works"} className={"button"}>View All <ArrowRight size={18}/></Link>
                )}
            </div>

            <div className="works-container">
                {works.map((work) => (
                    <div key={work._id} className={"work"}>
                        <div className="work-header">
                            <div className="work-title">
                                <h2>{work.title}</h2>

                                <div className={"work-tags"}>{work.tags?.map((tag, index) => (
                                    <span key={index}>{tag}</span>
                                ))}</div>


                            </div>

                            <span title={work.status}
                                  className={`status  ${work.status.toLowerCase().replace(" ", "-")}`}>{work.status}</span>
                        </div>
                        <div className="work-footer">
                            <div className="work-details">
                                <p>{new Date(work.dueDate!).toDateString()}</p>
                                <p>{work.category}</p>
                            </div>

                            <div className="work-cta">
                                <Button onClick={() => navigate(`/works/${work._id}`)
                                } className={'button02'}>View Details</Button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Works;