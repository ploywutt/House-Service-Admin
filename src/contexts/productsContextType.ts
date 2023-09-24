

export interface ProductContextType {
  
  loading: boolean;
  setLoading: (value: boolean) => void;
  errorMessage: string;
  setErrorMessage: (message: string) => void;

  // Category part
  currentCategory: string;
  setCurrentCategory: (category: string) => void;
  searchCategory: string;
  setSearchCategory: (search: string) => void;
  categories: any[]; 
  setCategories: (categories: any[]) => void;
  newCategory: any[]; 
  setNewCategory: (newCategory: any[]) => void;

  // Service part
  services: any[]; 
  setServices: (services: any[]) => void;
  searchService: string;
  setSearchService: (searchService: string) => void;
  newService: any; 
  setNewService: (newService: any) => void;
	fileList: File[] | null
  setFileList: (File: any[]) => void
  formData: object | null
  setFormData: (formData: any[]) => void
  submitServiceInput: boolean;
  setSubmitServiceInput: (value: boolean) => void
  imagePath: string | null 
  setImagePath: (imagePath: string) => void
  blobImage: any;
  setBlobImage: (blobImage: any) => void

  // Promotion part
  searchPromotion: string | null
  setSearchPromotion: (searchPromotion: string) => void
  promotion: any[]
  setPromotion: (promotion: any[]) => void;
  currentPromotion: any
  setCurrentPromotion: (currentPromotion: any) => void
};
