export const userColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
            alt="avatar"
          />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "phonenumber",
    headerName: "Phone",
    width: 130,
  },
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 230,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "title",
    headerName: "Title",
    width: 150,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 200,
  },
  {
    field: "hotelName",
    headerName: "Hotel",
    width: 200,
  },
  {
    field: "price",
    headerName: "Min Price",
    width: 130,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 130,
  },
];
export const orderColumns = [
  { field: "username", headerName: "User Name", width: 115 },
  { field: "hotelid", headerName: "Hotel Name", width: 230 },

  {
    field: "roomNumbers",
    headerName: "Room Number",
    width: 130,
  },
  {
    field: "start",
    headerName: "Start Date",
    width: 115,
  },
  {
    field: "end",
    headerName: "End Date",
    width: 115,
  },
  {
    field: "price",
    headerName: "Price $",
    width: 100,
  },
  {
    field: "status",
    headerName: "Paid",
    width: 100,
  },
  {
    field: "createdAt",
    headerName: "Create at",
    width: 115,
  },
];
