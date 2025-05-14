package auth

import (
	"log"
	"netdesk/modules/data"

	"github.com/gin-gonic/gin"
)

func AuthHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		cookie, err1 := c.Cookie("user")
		if (err1 != nil) {
			log.Print(err1)
			c.Next()
			return
		}

		claims, err2 := GetClaimsFromJWT(cookie)
		if (err2 != nil)  {
			log.Print(err2)
			c.Next()
			return
		}

		var user data.NdUser
		data.DB.Model(data.NdUser{}).Preload("Roles").First(&user, claims["id"])
		
		log.Print(user, claims["id"]);
		c.Set("user", &user)

		c.Next()
	}
}