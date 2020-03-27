import React from "react";

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

import { database } from "firebase/core";
import { motion, AnimatePresence } from "framer-motion";
import { useCollectionData } from "react-firebase-hooks/firestore";
import PoductCard from "components/ProductCard";
import {
  Search as InfoOutlined,
  StarBorder,
  ChevronLeft as ArrowLeft,
  ChevronRight as ArrowRight
} from "@material-ui/icons";
import {
  Masonry,
  FreeMasonry,
  useWindowScroller,
  useContainerRect
} from "masonic";
import styled from "styled-components";

const ProductContainer = styled.div`
  padding: "50px";
`;
const ProductGrid = props => {
  const { width, height, scrollY, isScrolling } = useWindowScroller(),
    [rect, containerRef] = useContainerRect(width, height);

  return React.createElement(
    FreeMasonry,
    Object.assign(
      {
        width: rect.width,
        height,
        scrollTop: Math.max(0, scrollY - (rect.top + scrollY)),
        isScrolling,
        containerRef
      },
      props
    )
  );
};

const ProductLog = () => {
  const ref = database
    .collection("materials")
    .orderBy("created", "desc")
    .limit(30);
  const [materials, loading, error] = useCollectionData(ref, { idField: true });
  console.log(`⭐: ProductLog -> materials`, materials);
  return (
    <>
      <ProductContainer>
        {!loading && (
          <Masonry
            columnGutter={25}
            columnWidth={210}
            items={materials}
            tabIndex={false}
            clearPositions
            render={Product}
            scrollTop={0}
            itemHeightEstimate={280}
            overscanBy={20}
          />
        )}
      </ProductContainer>

      {/* <Grid
        container
        spacing={5}
        justify="center"
        alignItems="stretch"
        justifyContent="flex-start"
        style={{ zIndex: 0 }}
        alignContent="stretch"
      >
        {!loading &&
          materials.docs.map((doc, index) => (
            <Grid xs={4} item style={{ zIndex: 0 }}>
              <PoductCard
                key={index}
                index={index}
                id={doc.id}
                {...doc.data()}
              />
            </Grid>
          ))}
      </Grid> */}
    </>
  );
};

const Product = ({ index, data }) => {
  console.log(`⭐: Product -> data`, data);
  const doc = 1;
  console.log(`⭐: Product -> doc`, doc);
  return <PoductCard index={index} id={doc.id} key={index} {...data} />;
};

export default ProductLog;
