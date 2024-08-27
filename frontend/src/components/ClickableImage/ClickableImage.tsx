// import { useState } from "react";
import "./ClickableImage.scss";

interface ClickableImageProps {
    src: string;
    alt?: string;
}

export const ClickableImage = ({src, alt}: ClickableImageProps) => {
    // const [isOpen, setIsOpen] = useState(false);

    // const toggleModal = () => {
    //     // setIsOpen(!isOpen);
    //     window.open(src, "_blank");
    // };

    return (
        <>
            <img
                src={src}
                alt={alt}
                className="slide clickable-image"
                // onClick={toggleModal}
                // onDrag={(e) => e.preventDefault()}
            />
            {/*{isOpen && (*/}
            {/*    <div className="modal" onClick={toggleModal}>*/}
            {/*        <div className="modal-content" onClick={(e) => e.stopPropagation()}>*/}
            {/*            <span className="close" onClick={toggleModal}>*/}
            {/*                &times;*/}
            {/*            </span>*/}
            {/*            <img src={src} alt={alt} className="modal-image" />*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}
        </>
    );
};
