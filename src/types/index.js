export const Hotel = {
    id: '',
    name: '',
    location: '',
    country: '',
    city: '',
    price: 0,
    rating: 0,
    image: '',
    description: '',
    amenities: []
  };
  
  export const Room = {
    id: '',
    type: '',
    price: 0,
    capacity: 0,
    description: ''
  };
  
  export const Booking = {
    id: '',
    hotelId: '',
    roomId: '',
    checkIn: '',
    checkOut: '',
    guests: 0,
    totalPrice: 0
  };
  
  export const SearchParams = {
    destination: '',
    checkIn: null,
    checkOut: null,
    guests: 0
  };
  