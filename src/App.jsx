import "./App.css";
import { useState, useContext } from "react";
import { places } from "./data.js";
import { getImageUrl } from "./utils.js";
import { ImgContxt } from "./Context.js";

function App() {
    const [isLarge, setIsLarge] = useState(false);
    const imageSize = isLarge ? 150 : 100;

    return (
        <ImgContxt.Provider value={imageSize}>
            <>
                <label>
                    <input
                        type='checkbox'
                        checked={isLarge}
                        onChange={(e) => {
                            setIsLarge(e.target.checked);
                        }}
                    />
                    Use large images
                </label>
                <hr />
                <List imageSize={imageSize} />
            </>
        </ImgContxt.Provider>
    );
}

function List() {
    const listItems = places.map((place) => (
        <li key={place.id}>
            <Place place={place} />
        </li>
    ));
    return <ul>{listItems}</ul>;
}

function Place({ place }) {
    return (
        <>
            <PlaceImage place={place} />
            <p>
                <b>{place.name}</b>
                {": " + place.description}
            </p>
        </>
    );
}

function PlaceImage({ place }) {
    const imageSize = useContext(ImgContxt);
    return (
        <img
            src={getImageUrl(place)}
            alt={place.name}
            width={imageSize}
            height={imageSize}
        />
    );
}

export default App;
