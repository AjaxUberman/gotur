import { gql, request } from "graphql-request";

const MASTER_URL: string = process.env.NEXT_PUBLIC_BACKEND_API_URL || "";

const getCategory = async () => {
  const query = gql`
    {
      categories(first: 50) {
        id
        name
        slug
        icon {
          url
        }
      }
    }
  `;
  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

const getBusiness = async (category: any) => {
  const query =
    gql`
    query GetBusiness {
      restaurants(where: { categories_some: { slug: "` +
    category +
    `" } }) {
        slug
        name
        restroType
        id
        address
        aboutUs
        banner(where: {}) {
          url
        }
        workingHours
      }
      categories {
        name
      }
    }
  `;
  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

const getBusinessDetail = async (businessSlug: string) => {
  const query =
    gql`
    query RestaurantDetail {
      restaurant(where: { slug: "` +
    businessSlug +
    `" }) {
        aboutUs
        address
        banner {
          url
        }
        categories {
          name
        }
        id
        name
        workingHours
        slug
        menu {
          ... on Menu {
            id
            category
            menuItem {
              ... on MenuItem {
                id
                name
                price
                description
                productImage {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;
  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

interface dataItem {
  email: string;
  description: string;
  name: string;
  price: number;
}

const AddToCart = async (data: dataItem) => {
  const query =
    gql`
    mutation AddToCart {
  createUserCart(
    data: {email: "` +
    data.email +
    `", productName: "` +
    data.name +
    `", productDescription: "` +
    data.description +
    `", price: ` +
    data.price +
    `}
  ) {
    id
  }
  publishManyUserCarts(to: PUBLISHED) {
    count
  }
}   
  `;

  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

const GetUserCart = async (email: string) => {
  const query =
    gql`
    query GetUserCart {
      userCarts(where: { email: "` +
    email +
    `" }) {
        id
        price
        productDescription
        productName
      }
    }
  `;
  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};
export default {
  getCategory,
  getBusiness,
  getBusinessDetail,
  AddToCart,
  GetUserCart,
};
