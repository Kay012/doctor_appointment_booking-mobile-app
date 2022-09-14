const io = require("socket.io")(8900, {
    cors: {
      origin: "http://localhost:19006",
    },
  });
  
  let users = [];
  
  const addUser = (userId, socketId, isClient) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId, isClient });
  };
  
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };

 clientsRoom = "clients"
  
  io.on("connection", (socket) => {
    //when ceonnect
    console.log(socket.id, " connected." );
  
    //take userId and socketId from user
    socket.on("addClient", (userId) => {
      addUser(userId, socket.id, isClient=true);
      socket.join(clientsRoom)
    //   io.emit("getUsers", users);
    //   socket.to(clientsRoom)

    });

    socket.on("addDoctor", (userId) => {
        addUser(userId, socket.id);
        // io.emit("getUsers", users);
        
      });
  
    //send and get message
    socket.on("sendBooking", async(docId) => {
      console.log(docId, users)
      const user = getUser(docId);
      console.log("updatingAppointments", user)
      console.log(await io.in(clientsRoom).allSockets())
      if(user!==undefined) io.to(user.socketId).emit("getBooking"
    //   , {
    //     senderId,
    //     text,
    //   }
      );
      socket.to(clientsRoom).emit("getAppointmentsUpdate", docId)
    });

    socket.on("cancelBooking", async(docId) => {
      console.log(docId,users)
      const user = getUser(docId);
      console.log("concelUpdatingAppointments")
      if(user!==undefined) io.to(user.socketId).emit("getBookingCancellation");
      console.log(await io.in(clientsRoom).allSockets())
      socket.to(clientsRoom).emit("getCancelAppointmentsUpdate", docId)
    })
  
    //when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
  