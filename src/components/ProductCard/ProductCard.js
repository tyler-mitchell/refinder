import React from 'react'

import {
    Card,
    Grid,
    CardMedia,
    Container,
    Fab,
    Box,
    InputBase,
    IconButton,
    Typography,
    CardContent
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { Link } from 'react-router-dom';
import { database } from "firebase/core";
import { motion, AnimatePresence } from "framer-motion";
import { useCollection } from "react-firebase-hooks/firestore";
import {
    Search as InfoOutlined,
    StarBorder,
    ChevronLeft as ArrowLeft,
    ChevronRight as ArrowRight
} from "@material-ui/icons";



const CarouselArrow = ({ icon: Icon, direction, hovered }) => {
    const { left, right } =
        direction === "left"
            ? { left: -10, right: "initial" }
            : { right: -10, left: "initial" };
    return (
        <Fab
            // variant="extended"
            style={{
                position: "relative",
                left,
                right,

                background: "white"
                // paddingLeft: left,
                // height: "25px",
                // width: "25px"
                // paddingRight: right
            }}
            size="small"
        >
            {/* {direction === "right" && <span>&nbsp;&nbsp;</span>} */}

            {Icon}
            {/* {direction === "left" && <span>&nbsp;&nbsp;</span>} */}
        </Fab>
    );
};

const ProductCard = props => {
    const [hovered, setHovered] = React.useState(false);
    const lightColor = "#ffff"
    const contrastColor = "#FFFF"
    const lightBlurColor = "#FAFAFA"
    return (
        <motion.div
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
        >
            <Card
                style={{
                    borderRadius: "12px",
                    position: "relative",
                    overflow: "visible",
                    minWidth: "300px",
                    minHeight: "300px",
                    boxShadow: `-10px -10px 24px 0 ${lightColor}, 10px 10px 24px 0 ${contrastColor}, inset 2px 2px 4px 0 ${lightBlurColor}, inset -2px -2px 4px 0 rgba(0,0,0,0.03)`,

                }}
                elevation={0}
            >
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{
                                type: "spring",
                                duration: 0.01,
                                stiffness: 50,
                                restSpeed: 1
                            }}
                            style={{
                                position: "absolute",
                                top: "25%",
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%"
                            }}
                        >
                            <CarouselArrow
                                hovered={hovered}
                                direction="left"
                                icon={<ArrowLeft />}
                            />

                            <CarouselArrow
                                hovered={hovered}
                                direction="right"
                                icon={<ArrowRight />}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
                <CardMedia
                    style={{ height: 200, borderRadius: "12px 12px 0 0" }}
                    image={`https://source.unsplash.com/collection/8793876/${props.index}`}
                    title="Paella dish"
                />
                <CardContent>

                    <Box component="fieldset" mb={3} borderColor="transparent">
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            mb="3px"
                        >
                            <Typography
                                display="inline"
                                component="legend"
                                variant="subtitle2"

                            >
                                {props.type}
                            </Typography>


                            <Typography
                                display="inline"
                                color="textSecondary"
                                component="legend"
                                variant="subtitle2"
                                style={{
                                    background: "#06caaf",
                                    position: "relative",
                                    right: -20,
                                    color: "white",
                                    padding: "3px",
                                    borderRadius: "4px"
                                }}
                            >
                                ${((props.index * props.index + 9) % 78) * 5}
                            </Typography>
                        </Box>
                        <Box mb="10px">
                            <Link to={`materials/${props.id}`}>



                                <Typography
                                    color="textSecondary"
                                    display="block"
                                    variant="subtitle2"
                                >
                                    {props.name}
                                </Typography>
                            </Link>
                        </Box>
                        <Rating name="read-only" value={props.index % 5} readOnly />
                    </Box>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default ProductCard