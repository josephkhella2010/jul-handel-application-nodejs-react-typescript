import { http,HttpResponse } from 'msw';

export const handlers = [
  http.get('http://localhost:5000/products', () => {
    return HttpResponse.json([
        
            {
              ind: 1,
              name: "julgran",
              price: 199.99,
              url: "../foto/julgran.jpg",
              imgs: ["../foto/julgran1.jpg", "../foto/julgran2.jpg"]
            },
            {
              ind: 2,
              name: "glitter",
              price: 49.99,
              url: "../foto/glitter.jpg",
              imgs: ["../foto/glitter1.jpg", "../foto/glitter2.jpg"]
            }
        
])
    
  }),
];
