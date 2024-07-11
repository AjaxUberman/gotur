import { gql, request } from "graphql-request";

const MASTER_URL: string = process.env.NEXT_PUBLIC_BACKEND_API_URL || "";

const sendRequest = async (query: any) => {
  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
};

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
  const result = await sendRequest(query);
  return result;
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
  const result = await sendRequest(query);
  return result;
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
  const result = await sendRequest(query);
  return result;
};

interface restaurant {
  slug: string;
}
interface dataItem {
  email: string;
  description: string;
  name: string;
  price: number;
  restaurantSlug: restaurant;
}

const AddToCart = async (data: dataItem) => {
  console.log(data);

  const query = gql`
    mutation AddToCart {
      createUserCart(
        data: {
          email: "${data.email}",
          productName: "${data.name}",
          productDescription: "${data.description}",
          price: ${data.price},
          restaurant: { connect: { slug: "${data.restaurantSlug}" } }
        }
      ) {
        id
      }
      publishManyUserCarts(to: PUBLISHED) {
        count
      }
    }
  `;

  const result = await sendRequest(query);
  return result;
};

const GetUserCart = async (email: string) => {
  const query =
    gql`
    query GetUserCart {
      userCarts(where: { email: "` +
    email +
    `" } first:50) {
         id
    price
    productDescription
    productName
    restaurant {
      name
    }
  }
}
  `;
  const result = await sendRequest(query);
  return result;
};

const DisconnectRestroFromUserCartItem = async (id: string) => {
  const query =
    gql`
    mutation DisconnectRestaurantFromCartItem {
      updateUserCart(
        data: { restaurant: { disconnect: true } }
        where: { id: "` +
    id +
    `" }
      ) {
        id
      }
      publishManyUserCarts(to: PUBLISHED) {
        count
      }
    }
  `;
  const result = await sendRequest(query);
  return result;
};

const DeleteCartFromItem = async (id: string) => {
  const query =
    gql`
    mutation DeleteCardItem {
      deleteUserCart(where: { id: "` +
    id +
    `" }) {
        id
      }
    }
  `;

  const result = await sendRequest(query);
  return result;
};

interface reviewItem {
  email: string;
  userName: string;
  reviewText: string;
  star: number;
  restaurantSlug: restaurant;
}

const PostReview = async (data: reviewItem) => {
  const query =
    gql`
    mutation AddNewReview {
      createReview(
        data: {
          email: "` +
    data.email +
    `"
          reviewText: "` +
    data.reviewText +
    `"
          star: ` +
    data.star +
    `
          userName: "` +
    data.userName +
    `"
          restaurant: { connect: { slug: "` +
    data.restaurantSlug +
    `" } }
        }
      )
        {
      id}
      publishManyReviews(to: PUBLISHED) {
    count
  }
    }
  `;

  const result = await sendRequest(query);
  return result;
};

const GetReviewItem = async (value: string) => {
  const query =
    gql`
    query GetRestReview {
      reviews(where: { restaurant: { slug: "` +
    value +
    `" } } first:50) {
        star
        userName
        id
        email
        createdAt
    reviewText
      }
    }
  `;
  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
};
export default {
  getCategory,
  getBusiness,
  getBusinessDetail,
  AddToCart,
  GetUserCart,
  DisconnectRestroFromUserCartItem,
  DeleteCartFromItem,
  PostReview,
  GetReviewItem,
};
