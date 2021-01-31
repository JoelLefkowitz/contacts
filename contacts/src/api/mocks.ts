export const mockContact = {
    id: 0,
    firstName: "firstName",
    lastName: "lastName",
    phoneNumber: "123",
    icon: null,
    notes: [],
    photos: []
}

export const mockEmptyContact = {
    id: 0,
    firstName: "firstName",
    lastName: "lastName",
    phoneNumber: null,
    icon: null,
    notes: [],
    photos: []
}

export const mockContacts = [
    ...Array.from(Array(10).keys()).map(_ => mockContact),
    ...Array.from(Array(10).keys()).map(_ => mockEmptyContact),
  ].sort(_ => 0.5 - Math.random())
  
export const mockPaginatedContacts = {
    count: 10,
    next: 1,
    previous: 0,
    results: mockContacts
}
  