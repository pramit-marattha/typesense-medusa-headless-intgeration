const Typesense = require("typesense");
const axios = require("axios");

module.exports = (async () => {
  const TYPESENSE_CONFIG = {
    nodes: [
      {
        host: "localhost",
        port: "8108",
        protocol: "http",
      },
    ],
    apiKey: "typesenseHeadless",
  };

  console.log("Config: ", TYPESENSE_CONFIG);

  const typesense = new Typesense.Client(TYPESENSE_CONFIG);

  const schema = {
    name: "products",
    num_documents: 0,
    fields: [
      {
        name: "title",
        type: "string",
        facet: true,
      },
      {
        name: "description",
        type: "string",
        facet: true,
      },
      {
        name: "thumbnail",
        type: "string",
        facet: false,
      },
      {
        name: "handle",
        type: "auto",
        facet: true,
      },
    ],
  };

    const products = await axios.get("http://localhost:9000/store/products");
    // console.log("Products: ", products.data.products);

    const productsToIndex = products.data.products.map((product) => {
        return {
            id: product.id,
            title: product.title,
            thumbnail: product.thumbnail,
            description: product.description,
            handle: product.handle,
        };
    });
console.log(products.data.products)

  try {
    const collection = await typesense.collections("products").retrieve();
    console.log("Found existing collection of products");
    console.log(JSON.stringify(collection, null, 2));
    if (collection.num_documents == productsToIndex.length) {
        console.log("Collection has diff number of docs than data");
        console.log("Deleting collection");
        await typesense.collections("products").delete();
      }
  } catch (err) {
    console.error(err);
  }

  console.log("Creating schema...");
  console.log(JSON.stringify(schema, null, 2));

  await typesense.collections().create(schema);

  console.log("Populating collection data...");

  try {
    const returnData = await typesense
      .collections("products")
      .documents()
      .import(productsToIndex);

    console.log("Return data: ", returnData);
  } catch (err) {
    console.error(err);
  }
})();