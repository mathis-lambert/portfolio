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
    school: string;
    schoolYear: string;
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

export interface WorksFilters {
    category: string[];
    status: string[];
    tags: string[];
    tools: string[];
    name: string;
    schools: string[];
    schoolYears: string[];
}


const Works = ({limit = null, section = false}: { limit: number | null, section: boolean }) => {
    const token = useSelector((state: RootState) => state.auth.token);
    const [works, setWorks] = useState<Work[]>([]);
    const [filteredWorks, setFilteredWorks] = useState<Work[]>([]);
    const [availableFilters, setAvailableFilters] = useState<WorksFilters>({
        category: [],
        status: [],
        tags: [],
        tools: [],
        name: '',
        schools: [],
        schoolYears: []
    });
    const [filters, setFilters] = useState<WorksFilters>({
        category: ['all'],
        status: ['all'],
        tags: ['all'],
        tools: ['all'],
        name: '',
        schools: ['all'],
        schoolYears: ['all']
    });
    // const [search, setSearch] = useState('');

    const navigate = useNavigate()

    const filterWorks = () => {
        const filteredWorks = works.filter((work) => {
            return (
                (filters.category.includes('all') || filters.category.includes(work.category!)) &&
                (filters.status.includes('all') || filters.status.includes(work.status)) &&
                (filters.tags.includes('all') || filters.tags.some((tag) => work.tags?.includes(tag))) &&
                (filters.tools.includes('all') || filters.tools.some((tool) => work.tools?.includes(tool))) &&
                (filters.schools.includes('all') || filters.schools.includes(work.school)) &&
                (filters.schoolYears.includes('all') || filters.schoolYears.includes(work.schoolYear)) &&
                (work.title.toLowerCase().includes(filters.name.toLowerCase()))
            );
        });

        setFilteredWorks(filteredWorks);
    }

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

    useEffect(() => {
        if (works.length === 0) return;

        const categories = new Set<string>();
        const statuses = new Set<string>();
        const tags = new Set<string>();
        const tools = new Set<string>();
        const schools = new Set<string>();
        const schoolYears = new Set<string>();

        works.forEach((work) => {
            categories.add(work.category!);
            statuses.add(work.status);
            work.tags?.forEach((tag) => tags.add(tag));
            work.tools?.forEach((tool) => tools.add(tool));
            schools.add(work.school);
            schoolYears.add(work.schoolYear);
        });

        setAvailableFilters({
            category: Array.from(categories),
            status: Array.from(statuses),
            tags: Array.from(tags),
            tools: Array.from(tools),
            name: '',
            schools: Array.from(schools),
            schoolYears: Array.from(schoolYears)
        });
    }, [works]);

    useEffect(() => {
        filterWorks();
    }, [filters, works]);


    return (
        <div className={`works ${section ? 'section' : ''}`}>
            <div className="works-header">
                <h1>Works</h1>
                {section && (
                    <Link to={"/works"} className={"button"}>View All <ArrowRight size={18}/></Link>
                )}
            </div>

            <div className="works-filters">
                <div className="filter">
                    <label htmlFor="name">Search</label>
                    <input type="text" id={"name"} onChange={(e) => {
                        setFilters({...filters, name: e.target.value});
                    }}/>
                </div>

                <div className="filter">
                    <label htmlFor="category">Category</label>
                    <select id={"category"} onChange={(e) => {
                        setFilters({...filters, category: e.target.value.split(',')});
                    }}>
                        <option value={'all'}>All</option>
                        {availableFilters.category.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                {/*<div className="filter">*/}
                {/*    <label htmlFor="status">Status</label>*/}
                {/*    <select id={"status"} value={filters.status} onChange={(e) => {*/}
                {/*        setFilters({...filters, status: e.target.value.split(',')});*/}
                {/*    }}>*/}
                {/*        <option value={'all'}>All</option>*/}
                {/*        {availableFilters.status.map((status) => (*/}
                {/*            <option key={status} value={status}>{status}</option>*/}
                {/*        ))}*/}
                {/*    </select>*/}
                {/*</div>*/}

                {/*<div className="filter">*/}
                {/*    <label htmlFor="tags">Tags</label>*/}
                {/*    <select id={"tags"} value={filters.tags} onChange={(e) => {*/}
                {/*        setFilters({...filters, tags: e.target.value.split(',')});*/}
                {/*    }}>*/}
                {/*        <option value={'all'}>All</option>*/}
                {/*        {availableFilters.tags.map((tag) => (*/}
                {/*            <option key={tag} value={tag}>{tag}</option>*/}
                {/*        ))}*/}
                {/*    </select>*/}
                {/*</div>*/}

                {/*<div className="filter">*/}
                {/*    <label htmlFor="tools">Tools</label>*/}
                {/*    <select id={"tools"} value={filters.tools} onChange={(e) => {*/}
                {/*        setFilters({...filters, tools: e.target.value.split(',')});*/}
                {/*    }}>*/}
                {/*        <option value={'all'}>All</option>*/}
                {/*        {availableFilters.tools.map((tool) => (*/}
                {/*            <option key={tool} value={tool}>{tool}</option>*/}
                {/*        ))}*/}
                {/*    </select>*/}
                {/*</div>*/}

                <div className="filter">
                    <label htmlFor="schools">Schools</label>
                    <select id={"schools"} onChange={(e) => {
                        setFilters({...filters, schools: e.target.value.split(',')});
                    }
                    }>
                        <option value={'all'}>All</option>
                        {availableFilters.schools.map((school) => (
                            <option key={school} value={school}>{school}</option>
                        ))}
                    </select>
                </div>

                <div className="filter">
                    <label htmlFor="schoolYears">School Years</label>
                    <select id={"schoolYears"} onChange={(e) => {
                        setFilters({...filters, schoolYears: e.target.value.split(',')});
                    }
                    }>
                        <option value={'all'}>All</option>
                        {availableFilters.schoolYears.map((schoolYear) => (
                            <option key={schoolYear} value={schoolYear}>{schoolYear}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="works-container">
                {filteredWorks.map((work) => (
                    <div key={work._id} className={"work"}>
                        <div className="work-background">
                            <img src={"/images/gradients/gradient_" + (Math.floor(Math.random() * 10) + 1) + ".jpg"}
                                 alt={"background"}/>
                        </div>
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