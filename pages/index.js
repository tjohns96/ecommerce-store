import React from "react";
import { Product, FooterBanner, HeroBanner } from "../components";
import { client } from "../lib/client";

export default function Home(props) {
  return (
    <>
      <HeroBanner heroBanner={props.bannerData.length && props.bannerData[0]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>All our best stuff!</p>
      </div>
      <div className="products-container">
        {props.products?.slice(0, 4).map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={props.bannerData && props.bannerData[0]} />
    </>
  );
}
export const getServerSideProps = async () => {
  const query = "*[_type == 'product']";
  const products = await client.fetch(query);

  const bannerQuery = "*[_type == 'banner']";
  const bannerData = await client.fetch(bannerQuery);
  return {
    props: { products, bannerData },
  };
};
