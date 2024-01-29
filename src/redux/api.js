import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:8000/",
// });
const API = axios.create({
  baseURL: "https://kind-erin-horse-tie.cyclic.app/",
});
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("profile")?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export const updateRegistrationInfo = (updatedInfo) =>
  API.patch("/users/updateRegistrationInfo", updatedInfo);

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
export const changeEmail = (formData) =>
  API.post("/users/changeEmail", formData);
export const changePassword = (formData) =>
  API.post("/users/changePassword", formData);

// Blogs
export const createTour = (TourData) => API.post("/Tour", TourData);
export const getTours = (page) => API.get(`/Tour/pageTours?page=${page}`);

export const getTour = (id) => API.get(`/Tour/${id}`);
export const deleteTour = (id) => API.delete(`/tour/${id}`);
export const updateTour = (updatedTourData, id) =>
  API.patch(`/Tour/${id}`, updatedTourData);
export const getToursByUser = (userId) => API.get(`/Tour/userTours/${userId}`);
export const getAllTours = () => API.get("/Tour");
export const getToursBySearch = (searchQuery) =>
  API.get(`/Tour/search?searchQuery=${searchQuery}`);

// Portfolio
export const createPortfolio = (PortfolioData) =>
  API.post("/Portfolio", PortfolioData);
export const getPortfolios = (page) => API.get(`/Portfolio?page=${page}`);
export const getPortfolio = (id) => API.get(`/Portfolio/${id}`);
export const deletePortfolio = (id) => API.delete(`/Portfolio/${id}`);
export const updatePortfolio = (updatedPortfolioData, id) =>
  API.patch(`/Portfolio/${id}`, updatedPortfolioData);
export const getPortfoliosByUser = (userId, page) =>
  API.get(`/Portfolio/userPortfolios/${userId}?page=${page}`);
export const getAllPortfolios = () => API.get("/Portfolio");
export const getPortfoliosBySearch = (searchQuery) =>
  API.get(`/Portfolio/search?searchQuery=${searchQuery}`);

// // Services
// export const createServices = (ServicesData) =>
//   API.post("/Services", ServicesData);
// export const getServicess = (page) => API.get(`/Services?page=${page}`);
// export const getServices = (id) => API.get(`/Services/${id}`);
// export const deleteServices = (id) => API.delete(`/Services/${id}`);
// export const updateServices = (updatedServicesData, id) =>
//   API.patch(`/Services/${id}`, updatedServicesData);
// export const getServicessByUser = (userId, page) =>
//   API.get(`/Services/userServicess/${userId}?page=${page}`);
// export const getAllServicess = () => API.get("/Services");
// export const getServicessBySearch = (searchQuery) =>
//   API.get(`/Services/search?searchQuery=${searchQuery}`);

// // Testimonial
// export const createTestimonial = (TestimonialData) =>
//   API.post("/Testimonial", TestimonialData);
// export const getTestimonials = (page) => API.get(`/Testimonial?page=${page}`);
// export const getTestimonial = (id) => API.get(`/Testimonial/${id}`);
// export const deleteTestimonial = (id) => API.delete(`/Testimonial/${id}`);
// export const updateTestimonial = (updatedTestimonialData, id) =>
//   API.patch(`/Testimonial/${id}`, updatedTestimonialData);
// export const getTestimonialsByUser = (userId, page) =>
//   API.get(`/Testimonial/userTestimonials/${userId}?page=${page}`);
// export const getAllTestimonials = () => API.get("/Testimonial");
// export const getTestimonialsBySearch = (searchQuery) =>
//   API.get(`/Testimonial/search?searchQuery=${searchQuery}`);
