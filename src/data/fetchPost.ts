interface FetchPostsResponse {
    posts: Post[];
    pagination: {
        totalItems: number;
        totalPages: number;
        currentPage: number;
      };
  }