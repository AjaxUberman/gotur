import { render, screen, waitFor } from "@testing-library/react";
import RestaurantPage from "../components/Pages/RestaurantPage";
import GlobalApi from "../app/_utils/GlobalApi";
import { useUser } from "@clerk/nextjs";
import { useRouter, useParams } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import "@testing-library/jest-dom";
import React from "react";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock("@clerk/nextjs", () => ({
  useUser: jest.fn(),
}));

jest.mock("react-responsive", () => ({
  useMediaQuery: jest.fn(),
}));

jest.mock("@/app/_utils/GlobalApi", () => ({
  getBusinessDetail: jest.fn(),
  GetReviewItem: jest.fn(),
}));

const mockUseRouter = useRouter as jest.Mock;
const mockUseParams = useParams as jest.Mock;
const mockUseUser = useUser as jest.Mock;
const mockUseMediaQuery = useMediaQuery as jest.Mock;

describe("RestaurantPage", () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({ push: jest.fn() });
    mockUseParams.mockReturnValue({ id: "123" });
    mockUseUser.mockReturnValue({ user: { id: "user1" } });
    mockUseMediaQuery.mockReturnValue(false);
  });

  test("renders loading component initially", () => {
    render(<RestaurantPage />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("renders restaurant data correctly", async () => {
    const mockRestaurantData = {
      restaurant: {
        slug: "test-slug",
        name: "Test Restaurant",
        address: "Test Address",
        banner: { url: "https://example.com/banner.jpg" },
        categories: [{ name: "Category1" }, { name: "Category2" }],
        aboutUs: "About us text",
      },
    };

    (GlobalApi.getBusinessDetail as jest.Mock).mockResolvedValue(
      mockRestaurantData
    );
    (GlobalApi.GetReviewItem as jest.Mock).mockResolvedValue({
      reviews: [{ star: 5 }],
    });

    render(<RestaurantPage />);

    await waitFor(() => {
      expect(screen.getByText(/Test Restaurant/i)).toBeInTheDocument();
      expect(screen.getByText(/Test Address/i)).toBeInTheDocument();
      expect(screen.getByText(/Category1/i)).toBeInTheDocument();
      expect(screen.getByText(/Category2/i)).toBeInTheDocument();
    });
  });

  test("renders NotFound component if restaurant is null", async () => {
    (GlobalApi.getBusinessDetail as jest.Mock).mockResolvedValue({
      restaurant: null,
    });

    render(<RestaurantPage />);

    await waitFor(() => {
      expect(screen.getByText(/Not Found/i)).toBeInTheDocument();
    });
  });
});
