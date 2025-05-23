import { User } from "@/schemas/GlobalSchema";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";

export const categories = [
  {
    value: "Admin",
    label: "Admin",
  },
  {
    value: "Nurse 1",
    label: "Nurse 1",
  },
  {
    value: "Nurse 2",
    label: "Nurse 3",
  },
  {
    value: "Receptionist",
    label: "Receptionist",
  },
  {
    value: "Doctor A",
    label: "Doctor A",
  },
  {
    value: "Doctor B",
    label: "Doctor B",
  },
  {
    value: "Doctor C",
    label: "Doctor C",
  },
  //   {
  //     value: "work",
  //     label: "Work",
  //   },
  //   {
  //     value: "entertainment",
  //     label: "Entertainment",
  //   },
  //   {
  //     value: "education",
  //     label: "Education",
  //   },
  //   {
  //     value: "gifts",
  //     label: "Gifts",
  //   },
];

export const incomeType = [
  {
    label: "Income",
    value: "income",
    icon: ArrowUpIcon,
  },
  {
    label: "Expense",
    value: "expense",
    icon: ArrowDownIcon,
  },
];
export const totalAppointment = [
  {
    label: "1",
    value: "1",
  },
  {
    label: "2",
    value: "2",
  },
  {
    label: "3",
    value: "3",
  },
  {
    label: "4",
    value: "4",
  },
  {
    label: "5",
    value: "5",
  },
  {
    label: "6",
    value: "6",
  },
  {
    label: "7",
    value: "7",
  },
  {
    label: "8",
    value: "8",
  },
  {
    label: "9",
    value: "9",
  },
  {
    label: "10",
    value: "10",
  },
];
export const Data = [
  {
    label: "salary",
    note: "monthly salary",
    category: "income",
    type: "income",
    amount: 5000,
    date: "2024-06-25",
  },
  {
    label: "groceries",
    note: "weekly grocery shopping",
    category: "food",
    type: "expense",
    amount: 150,
    date: "2024-06-24",
  },
  {
    label: "electricity bill",
    note: "monthly electricity bill",
    category: "utilities",
    type: "expense",
    amount: 100,
    date: "2024-06-23",
  },
  {
    label: "freelance work",
    note: "payment for freelance project",
    category: "income",
    type: "income",
    amount: 800,
    date: "2024-06-22",
  },
  {
    label: "rent",
    note: "monthly rent payment",
    category: "housing",
    type: "expense",
    amount: 1200,
    date: "2024-06-21",
  },
  {
    label: "gym membership",
    note: "monthly gym fee",
    category: "health",
    type: "expense",
    amount: 50,
    date: "2024-06-20",
  },
  {
    label: "restaurant",
    note: "dinner at a restaurant",
    category: "food",
    type: "expense",
    amount: 75,
    date: "2024-06-19",
  },
  {
    label: "internet bill",
    note: "monthly internet bill",
    category: "utilities",
    type: "expense",
    amount: 60,
    date: "2024-06-18",
  },
  {
    label: "transport",
    note: "public transport pass",
    category: "transport",
    type: "expense",
    amount: 40,
    date: "2024-06-17",
  },
  {
    label: "office supplies",
    note: "stationery items for office",
    category: "work",
    type: "expense",
    amount: 30,
    date: "2024-06-16",
  },
  {
    label: "concert tickets",
    note: "tickets for a concert",
    category: "entertainment",
    type: "expense",
    amount: 100,
    date: "2024-06-15",
  },
  {
    label: "car maintenance",
    note: "annual car servicing",
    category: "transport",
    type: "expense",
    amount: 200,
    date: "2024-06-14",
  },
  {
    label: "book purchase",
    note: "buying a new book",
    category: "education",
    type: "expense",
    amount: 25,
    date: "2024-06-13",
  },
  {
    label: "movie night",
    note: "tickets for a movie",
    category: "entertainment",
    type: "expense",
    amount: 30,
    date: "2024-06-12",
  },
  {
    label: "gift",
    note: "birthday gift for a friend",
    category: "gifts",
    type: "expense",
    amount: 50,
    date: "2024-06-11",
  },
];

// lib/mock-users.ts

export const usersData: User[] = [
  {
    id: "u1",
    fullName: "Alice Johnson",
    email: "alice.johnson@example.com",
    phoneNumber: "123-456-7890",
    dateOfBirth: "1990-05-12",
    totalAppointments: 5,
    lastAppointment: "2024-03-01T10:00:00Z",
    createdBy: "Admin",
  },
  {
    id: "u2",
    fullName: "Bob Smith",
    email: "bob.smith@example.com",
    phoneNumber: "234-567-8901",
    dateOfBirth: "1985-11-23",
    totalAppointments: 3,
    lastAppointment: "2024-02-20T14:30:00Z",
    createdBy: "Admin",
  },
  {
    id: "u3",
    fullName: "Charlie Brown",
    email: "charlie.brown@example.com",
    phoneNumber: "345-678-9012",
    dateOfBirth: "1992-07-01",
    totalAppointments: 8,
    lastAppointment: "2024-03-10T16:00:00Z",
    createdBy: "Nurse 1",
  },
  {
    id: "u4",
    fullName: "Daisy Wilson",
    email: "daisy.wilson@example.com",
    phoneNumber: "456-789-0123",
    dateOfBirth: "1993-08-17",
    totalAppointments: 2,
    lastAppointment: "2024-02-25T09:00:00Z",
    createdBy: "Receptionist",
  },
  {
    id: "u5",
    fullName: "Ethan Lee",
    email: "ethan.lee@example.com",
    phoneNumber: "567-890-1234",
    dateOfBirth: "1988-03-05",
    totalAppointments: 6,
    lastAppointment: "2024-03-05T11:15:00Z",
    createdBy: "Doctor A",
  },
  {
    id: "u6",
    fullName: "Fiona Patel",
    email: "fiona.patel@example.com",
    phoneNumber: "678-901-2345",
    dateOfBirth: "1991-12-29",
    totalAppointments: 4,
    lastAppointment: "2024-03-02T13:45:00Z",
    createdBy: "Doctor B",
  },
  {
    id: "u7",
    fullName: "George King",
    email: "george.king@example.com",
    phoneNumber: "789-012-3456",
    dateOfBirth: "1984-09-09",
    totalAppointments: 1,
    lastAppointment: "2024-01-20T10:30:00Z",
    createdBy: "Receptionist",
  },
  {
    id: "u8",
    fullName: "Hannah Scott",
    email: "hannah.scott@example.com",
    phoneNumber: "890-123-4567",
    dateOfBirth: "1996-02-14",
    totalAppointments: 7,
    lastAppointment: "2024-03-08T15:00:00Z",
    createdBy: "Doctor C",
  },
  {
    id: "u9",
    fullName: "Isaac Kim",
    email: "isaac.kim@example.com",
    phoneNumber: "901-234-5678",
    dateOfBirth: "1987-10-10",
    totalAppointments: 9,
    lastAppointment: "2024-03-11T12:00:00Z",
    createdBy: "Nurse 2",
  },
  {
    id: "u10",
    fullName: "Jasmine Baker",
    email: "jasmine.baker@example.com",
    phoneNumber: "012-345-6789",
    dateOfBirth: "1995-06-18",
    totalAppointments: 10,
    lastAppointment: "2024-03-12T14:30:00Z",
    createdBy: "Doctor A",
  },
  {
    id: "u11",
    fullName: "Kevin Zhang",
    email: "kevin.zhang@example.com",
    phoneNumber: "111-222-3333",
    dateOfBirth: "1994-01-30",
    totalAppointments: 2,
    lastAppointment: "2024-03-04T09:45:00Z",
    createdBy: "Doctor C",
  },
  {
    id: "u12",
    fullName: "Laura Chen",
    email: "laura.chen@example.com",
    phoneNumber: "222-333-4444",
    dateOfBirth: "1990-09-09",
    totalAppointments: 5,
    lastAppointment: "2024-02-28T10:15:00Z",
    createdBy: "Doctor A",
  },
  {
    id: "u13",
    fullName: "Michael Davis",
    email: "michael.davis@example.com",
    phoneNumber: "333-444-5555",
    dateOfBirth: "1983-04-12",
    totalAppointments: 3,
    lastAppointment: "2024-03-01T10:45:00Z",
    createdBy: "Receptionist",
  },
  {
    id: "u14",
    fullName: "Nina Torres",
    email: "nina.torres@example.com",
    phoneNumber: "444-555-6666",
    dateOfBirth: "1992-03-03",
    totalAppointments: 6,
    lastAppointment: "2024-03-06T11:30:00Z",
    createdBy: "Nurse 1",
  },
  {
    id: "u15",
    fullName: "Oliver Harris",
    email: "oliver.harris@example.com",
    phoneNumber: "555-666-7777",
    dateOfBirth: "1989-07-27",
    totalAppointments: 4,
    lastAppointment: "2024-03-03T16:00:00Z",
    createdBy: "Admin",
  },
  {
    id: "u16",
    fullName: "Penelope Wright",
    email: "penelope.wright@example.com",
    phoneNumber: "666-777-8888",
    dateOfBirth: "1997-05-22",
    totalAppointments: 3,
    lastAppointment: "2024-02-22T15:15:00Z",
    createdBy: "Doctor A",
  },
  {
    id: "u17",
    fullName: "Quinn Adams",
    email: "quinn.adams@example.com",
    phoneNumber: "777-888-9999",
    dateOfBirth: "1991-08-08",
    totalAppointments: 7,
    lastAppointment: "2024-03-07T12:30:00Z",
    createdBy: "Doctor B",
  },
  {
    id: "u18",
    fullName: "Ruby Evans",
    email: "ruby.evans@example.com",
    phoneNumber: "888-999-0000",
    dateOfBirth: "1986-10-31",
    totalAppointments: 8,
    lastAppointment: "2024-03-09T13:00:00Z",
    createdBy: "Receptionist",
  },
  {
    id: "u19",
    fullName: "Samuel Moore",
    email: "samuel.moore@example.com",
    phoneNumber: "999-000-1111",
    dateOfBirth: "1993-11-20",
    totalAppointments: 1,
    lastAppointment: "2024-01-15T09:30:00Z",
    createdBy: "Admin",
  },
  {
    id: "u20",
    fullName: "Tina Foster",
    email: "tina.foster@example.com",
    phoneNumber: "000-111-2222",
    dateOfBirth: "1990-02-02",
    totalAppointments: 5,
    lastAppointment: "2024-03-02T10:45:00Z",
    createdBy: "Doctor A",
  },
];
export const servicesData = [
  {
    serviceName: "Haircut",
    description: "Professional men's haircut",
    duration: "30 mins",
    status: "active",
    visibility: true,
    createdBy: "Samrat Verma",
    createdAt: "2025-03-10",
  },
  {
    serviceName: "Hair Spa",
    description: "Nourishing treatment for damaged hair",
    duration: "45 mins",
    status: "inactive",
    visibility: false,
    createdBy: "Rohit Malhotra",
    createdAt: "2025-01-15",
  },
  {
    serviceName: "Beard Trim",
    description: "Detailed beard shaping and trim",
    duration: "20 mins",
    status: "active",
    visibility: true,
    createdBy: "Karan Mehta",
    createdAt: "2025-02-05",
  },
  {
    serviceName: "Facial Cleanup",
    description: "Deep cleansing for clear skin",
    duration: "40 mins",
    status: "active",
    visibility: true,
    createdBy: "Neha Sharma",
    createdAt: "2025-03-01",
  },
  {
    serviceName: "Massage Therapy",
    description: "Relaxing full body massage",
    duration: "60 mins",
    status: "inactive",
    visibility: false,
    createdBy: "Dr. Amit Roy",
    createdAt: "2024-12-20",
  },
  {
    serviceName: "Hair Color",
    description: "Custom coloring with ammonia-free products",
    duration: "90 mins",
    status: "active",
    visibility: true,
    createdBy: "Anjali Singh",
    createdAt: "2025-02-20",
  },
  {
    serviceName: "Manicure",
    description: "Hand grooming and polish",
    duration: "25 mins",
    status: "active",
    visibility: true,
    createdBy: "Tanya Kapoor",
    createdAt: "2025-03-05",
  },
  {
    serviceName: "Pedicure",
    description: "Foot grooming and nail care",
    duration: "30 mins",
    status: "inactive",
    visibility: false,
    createdBy: "Deepak Chauhan",
    createdAt: "2024-11-10",
  },
  {
    serviceName: "Hair Straightening",
    description: "Temporary straightening with serum",
    duration: "50 mins",
    status: "active",
    visibility: true,
    createdBy: "Sonal Jain",
    createdAt: "2025-01-25",
  },
  {
    serviceName: "Waxing",
    description: "Full body waxing session",
    duration: "60 mins",
    status: "active",
    visibility: true,
    createdBy: "Priya Das",
    createdAt: "2025-02-10",
  },
  {
    serviceName: "Scalp Treatment",
    description: "Anti-dandruff and oil control therapy",
    duration: "35 mins",
    status: "active",
    visibility: true,
    createdBy: "Shivam Rajput",
    createdAt: "2025-03-12",
  },
  {
    serviceName: "Makeup Trial",
    description: "Test run before wedding or event",
    duration: "75 mins",
    status: "inactive",
    visibility: false,
    createdBy: "Divya Ahuja",
    createdAt: "2024-12-01",
  },
  {
    serviceName: "Nail Art",
    description: "Custom nail design service",
    duration: "30 mins",
    status: "active",
    visibility: true,
    createdBy: "Rhea Mehra",
    createdAt: "2025-01-18",
  },
];
