package server

import (
	"flag"
	"os"
	"time"
)
var(
	addr = flag.String("addr,":"",os.Getenv("PORT"),""
	cert = flag*flag.String("cert","","")
	key=fl*flag.String("key","","")
)
func  Run() error  {
	flag.Parse()
	if *addr==":"{
		*addr=":8080"
	}
	// routes
	app.GET("/",handlers.Welcome)
	app.GET("/room/create",handlers.RoomCreate)
	app.GET("/room/:uuid",handlers.Room)
	app.GET("/room/:uuid/websocket",)
	app.GET("/room/:uuid/chat",handlers.RoomChat)
	app.GET("/room/:uuid/chat/websocket",websocket.New(handlers.RoomChatWebsocket))
	app.GET("/room/:uuid/viewer/websocket",websocket.New(handlers.RoomViewerWebsocket))
	app.Get("/stream/:ssuid",handlers.Stream)
	app.Get("/stream/:ssuid/websocket",)
	app.Get("/stream/:ssuid/chat/websocket",)
	app.Get("/stream/:ssuid/viewer/websocket",)

}


)