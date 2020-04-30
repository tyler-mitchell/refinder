import React, { useState } from "react";
import { Marker, Popup } from "react-map-gl";
import Pin from "./pin.js";
import { Typography, IconButton } from "@material-ui/core";
import { setMapLocation } from "redux/listingsSlice";
import { useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import LeftArrow from "@material-ui/icons/ChevronLeft";
import RightArrow from "@material-ui/icons/ChevronRight";
import styled from "styled-components";

const markerColor = {
  pin: "red",
  unpin: "blue",
};
const StyledMarker = styled.div`
  background: ${({ isPinned }) =>
    isPinned ? markerColor.pin : markerColor.unpin};
  border: 1px solid #ffffff;
  border-radius: 3px;
  font-size: 12px;
  color: #ffffff;
  width: 42px;
  height: 24px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;

  &:before {
    content: "";
    position: absolute;
    top: 22px;
    left: 15px;
    height: 0;
    border-style: solid;
    border-width: 5px 5px 0 5px;
    border-color: ${({ isPinned }) =>
        isPinned ? markerColor.pin : markerColor.unpin}
      transparent transparent transparent;
    z-index: 9999;
  }

  &:after {
    content: "";
    position: absolute;
    top: 23px;
    left: 15px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 5px 5px 0px 5px;
    border-color: #ffffff transparent transparent transparent;
    z-index: 9998;
  }

  &:hover {
    background: rgb(50, 139, 210);
    width: 50px;
    height: 26px;
    font-size: 13px;
    font-weight: 600;

    &:before {
      top: 25px;
      left: 19px;
      border-color: rgb(50, 139, 210) transparent transparent transparent;
    }

    &:after {
      top: 26px;
      left: 19px;
    }
  }
`;

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 300 : -300,

      opacity: 0,
    };
  },
};

const CarouselButton = styled(IconButton)`
  top: calc(50% - 20px);
  color: rgba(255, 255, 255, 0.7);
  position: absolute;
  z-index: 2;
`;

const ProductPopup = styled(Popup)`
  .mapboxgl-popup-content {
    border-radius: 8px;
    padding: 0;
    box-shadow: 0px 20px 28px 5px rgba(0, 0, 0, 0.05),
      0px 3px 8px 5px rgba(0, 0, 0, 0.05);
  }

  .mapboxgl-popup-tip {
  }
  filter: drop-shadow(0 5x 15px rgba(0, 0, 0, 0.2));
  /* inset 0 -100px 50px 50px rgba(0, 0, 0, 0.2); */
`;

const Carousel = ({ images }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.

  const wrap = (min, max, v) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
  };

  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <>
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          style={{
            position: "absolute",
            zIndex: 1000,
            objectFit: "cover",
            boxShadow:
              "0 12px 28px 0 rgba(0, 0, 0, 0.06), 0 2px 4px 0 rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.5)",
            borderRadius: "8px",
            width: "100%",
            height: "100%",
          }}
          src={images[imageIndex].downloadUrl}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: {
              type: "spring",
              stiffness: 100,
              damping: 50,
              restSpeed: 0.5,
            },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        />
      </AnimatePresence>
      <CarouselButton
        size="small"
        style={{ right: "5px" }}
        onClick={() => paginate(1)}
      >
        <RightArrow />
      </CarouselButton>
      <CarouselButton
        size="small"
        style={{ left: "5px" }}
        onClick={() => paginate(-1)}
      >
        <LeftArrow />
      </CarouselButton>
    </>
  );
};

const ProductMarker = ({
  address,
  title,
  type,
  productImages,
  showPopup,
  id,
}) => {
  const [showInfo, setInfo] = useState(false);
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(
      setMapLocation({
        location: { latitude: address.latitude, longitude: address.longitude },
        productId: id,
      })
    );
  }

  return (
    <>
      <Marker
        latitude={address.latitude}
        longitude={address.longitude}
        markerColor={"red"}
        draggable={false}
        style={{ zIndex: 0, position: "absolute" }}
        // captureClick={true}
        offsetLeft={-15}
        offsetTop={-10}
        isPinned={false}
      >
        <div
          onClick={() => {
            handleClick();
          }}
        >
          <Pin />
        </div>
        {/* <StyledMarker isPinned={true}>{type}</StyledMarker> */}
      </Marker>
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ zIndex: 1000, position: "relative" }}
            exit={{ opacity: 0 }}
          >
            <ProductPopup
              latitude={address.latitude}
              longitude={address.longitude}
              dynamicPosition={false}
              closeButton={false}
              closeOnClick={false}
              onClose={() => setInfo(false)}
              anchor="bottom"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    width: "250px",
                    overflow: "hidden",
                    display: "flex",
                    top: "-20px",
                    height: "140px",
                    position: "relative",
                    borderRadius: "8px",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: "250px",
                      height: "140px",
                      borderRadius: "8px",

                      position: "relative",
                    }}
                  >
                    {productImages && <Carousel images={productImages} />}
                  </div>
                </div>
                <div
                  style={{
                    padding: "10px",
                    position: "relative",
                    top: "-20px",
                    width: "250px",
                  }}
                >
                  <Typography
                    align="left"
                    style={{ fontWeight: 600, fontSize: 16 }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    align="left"
                    style={{
                      fontSize: 14,
                      fontWeight: 550,
                      color: "rgba(0,0,0,0.3)",
                    }}
                  >
                    {address?.complete?.split(",")[0]}
                  </Typography>
                </div>
              </div>
            </ProductPopup>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductMarker;
