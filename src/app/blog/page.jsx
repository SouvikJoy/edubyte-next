import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
let base_url;
if(process.env.MODE === "development") {
   base_url = 'http://localhost:3000'
} else{
  base_url = 'http://edubyte.tech'
}
export const metadata = {
  title: "Edubyte | Blog",
  description: "This is Blog Page",
};
async function getData() {
  const res = await fetch(`${base_url}/api/posts`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Blog = async () => {
  const data = await getData();
  return (
    <div className={styles.mainContainer}>
      {data.map((item) => (
        <Link href={`/blog/${item._id}`} className={styles.container} key={item.id}>
          <div className={styles.imageContainer}>
            <Image
              src={item.img}
              alt=""
              width={400}
              height={250}
              className={styles.image}
            />
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.desc}>{item.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Blog;
