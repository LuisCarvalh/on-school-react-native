export async function fetchPosts(token: string, content: string, page: number = 0, limit: number = 10): Promise<FetchPostsResponse> {

    var url;

    if(content === ''){
        url = `http://localhost:3000/post/search?page=${page}&limit=${limit}`;
    }else{
        url = `http://localhost:3000/post/search?page=${page}&limit=${limit}&keyword=${content}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
  
    const data: FetchPostsResponse = await response.json();
    return data;
  }