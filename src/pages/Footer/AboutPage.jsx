import { useEffect, useState } from "react";
import classes from "./AboutPage.module.css";
import { fetchCategories } from "../../util/categoryActions";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    const handleCategoryClick = (category) => {
        navigate("/", { state: { selectedCategory: category } });
    };

    useEffect(() => {
        fetchCategories().then((response) => {
            if (response.status === 200) {
                setCategories(response.data);
            } else {
                setError(response.error);
            }
        });
    }, []);

    return (
        <div className={classes.aboutPage}>
            <div className={classes.aboutContainer}>
                <h1 className={classes.aboutTitle}>About Korgi Games</h1>
                <p className={classes.aboutDescription}>
                    Korgi Games has the best free online games selection and
                    offers the most fun experience to play alone or with
                    friends. We offer instant play to all our games without
                    downloads, login, popups or other distractions. Our games
                    are playable on desktop, tablet and mobile so you can enjoy
                    them at home or on the road. Every month millions of gamers
                    from all over the world play their favorite games on Korgi
                    Games.
                </p>
                <h2 className={classes.sectionTitle}>Our Game Selection</h2>
                <p className={classes.aboutDescription}>
                    Game developers release fun New Games on our platform daily.
                    Our most Popular Games include hits like ZUNO, Shade Shuffle
                    and Soccer Jerks. These games are only playable on Korgi
                    Games. We also have online classics like High or Low, Bottle
                    Shoot and Tower Buster to play for free. In total, we offer
                    more than 50 games.
                </p>
                <h2 className={classes.sectionTitle}>Start Playing</h2>
                <p className={classes.aboutDescription}>
                    Unsure what game to play? Start your game discovery on our
                    homepage or pick a game from any of these popular
                    categories:
                </p>
                <ul className={classes.gameList}>
                    {categories.length === 0 && <p>Loading Categories...</p>}
                    {categories.map((category) => (
                        <li
                            key={category.id}
                            className={classes.gameItem}
                            onClick={() => handleCategoryClick(category.name)}
                        >
                            {category.name}
                        </li>
                    ))}
                </ul>
                <h2 className={classes.sectionTitle}>What is Korgi Games?</h2>
                <p className={classes.aboutDescription}>
                    Korgi Games is based in Surat and has a team of 4 Intern
                    people working on our gaming platform. Our goal is to create
                    the ultimate online playground. Free and open to all. Read
                    more about the platform we are building on our company page.
                    If you are a game developer looking to achieve success for
                    your game on the web, discover what we offer and get in
                    touch via Korgi Games for Developers.
                </p>
            </div>
        </div>
    );
};

export default AboutPage;
