// communitysnippetservice.js

class CommunitySnippetService {
    constructor() {
      this.baseURL = 'http://localhost:5000/api/community-snippets';
    }
  
    async createCommunitySnippet(token, snippetData) {
      try {
        const response = await fetch(this.baseURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token
          },
          body: JSON.stringify(snippetData)
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error creating community snippet:', error);
        throw error;
      }
    }
  
    async getAllCommunitySnippets() {
      try {
        const response = await fetch(this.baseURL);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching community snippets:', error);
        throw error;
      }
    }
  
    async getCommunitySnippetById(id) {
      try {
        const response = await fetch(`${this.baseURL}/${id}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching community snippet by ID:', error);
        throw error;
      }
    }
  
    async updateCommunitySnippet(token, id, snippetData) {
      try {
        const response = await fetch(`${this.baseURL}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token
          },
          body: JSON.stringify(snippetData)
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error updating community snippet:', error);
        throw error;
      }
    }
  
    async deleteCommunitySnippet(token, id) {
      try {
        const response = await fetch(`${this.baseURL}/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token
          }
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error deleting community snippet:', error);
        throw error;
      }
    }
  
    async getCommunitySnippetsByCommunityId(communityId) {
      try {
        const response = await fetch(`${this.baseURL}/community/${communityId}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching community snippets by community ID:', error);
        throw error;
      }
    }
  }
  
  export default CommunitySnippetService;
  