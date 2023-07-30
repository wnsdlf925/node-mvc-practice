const express = require('express')
const router = express.Router()


// const notificationController = require('../controller/notificationcontroller')

/**
 * @author 오기용
 * @description 테스트
 */
const admin = require('firebase-admin')
let serviceAccount = require('../fcm-practice-214ca-firebase-adminsdk-v75tp-bea8071f1b.json')
router.post('/test', (req, res)=>{
    if(!admin.apps.length){
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        })
    }
    

    let message = {
        token: 'dSwXSAokIkg:APA91bFiEfYlo1aspnyRzYouqoZB2zmKlwzwAUjAN2rLvLLn2Ow_Mf5x2L8ZFWIlREycVqqQzhJwtWYIwMFwG42z5DNGyn508Nr1sObqoYDqblTXei7RVbIlwpTQ0ipcirW5Rz6cHxKR',
        data: {
            title: "node에서 title",
            body: "node에서의 data"
        }
    }

    try {
        admin
        .messaging()
        .send(message)
        .then(res.send("보내짐"))
        
    } catch (error) {
        res.send(error)
    }

    
})


// const FCM = require('fcm-node')
// router.post('/test', (req, res)=>{
//     let serverKey = 'AAAA1nQC9iM:APA91bGlgpU3hbqYLgkXkQOjnCI9whp7YPKQA13glWQXhqVAJPG5GW7I3DEmXWaPaQTtjpHPJnLCtqcFxlvtgV3A4M41qovYtW0SiuKHLY_VErAbG9_sBqt9vMA9llhlZIu7Xe3qI1lB'

//     let fcm = FCM(serverKey)

//     let message = {
//         to: 'dSwXSAokIkg:APA91bFiEfYlo1aspnyRzYouqoZB2zmKlwzwAUjAN2rLvLLn2Ow_Mf5x2L8ZFWIlREycVqqQzhJwtWYIwMFwG42z5DNGyn508Nr1sObqoYDqblTXei7RVbIlwpTQ0ipcirW5Rz6cHxKR',
//         priority: "high",
//         data: {
//             title: "node에서 title",
//             body: "node에서의 data"
//         }
//     }
    
//     let success
//     fcm.send(message, function(err, res){
//         if(err){
//             console.log(err)
//         }else{
//             success = res
//         }
//     })
//     res.send(success)
// })

module.exports = router