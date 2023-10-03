## Initial Setup
1. Make a samsung account: https://account.samsung.com/accounts/v1/MBR/terms?itnlYN=Y
1. Get the LAN ip address of you development machine and write it down
2. Get the LAN ip address of your tv via settings -> network -> status? and write it down
3. run `npm install && npm run build`
3. run `npm run install-tizen-setup` and follow the terminal settings to set a workspace
4. On the TV open the "Apps" App and hit the settings/123/Red/Green/Yellow/Blue Button
5. Type in 12345 hit enter
6. Turn on developer mode
7. Set the ip on the tvs dialog to the LAN ip of your development machine
8. With Tizen Studio open on you development machine click tools -> Device Manager
9. Once Device Manager Opens click the second icon on the right, if you hover it will say "Remote Device Manager"
10. In "Remote Device Manager" Click the + button, name the device, use the LAN ip of the tv, and **DO NOT CHANGE THE PORT**.
11. Then Click Add. Make sure that the connection is ON and blue. Then click close and make sure the connection is still on and blue in Device Manager. Keep Device Manager Open.
11. Open "Tools" -> "Certificate Manager"
12. Click "+" then "Samsung" then "TV" then "Next"
13. Name the certificate, "jwplayer" then click "Next"
14. Make sure "Create a new author certificate" is checked and hit "next"
14. Fill out the information, make the password easy like Password123
15. When prompted signin to your samsung account.
16. Set privledge level Partner to allow DRM (not sure if this is needed or not)
17. Now go back to device manager, right click the device, and click "permit to install applications"
18. Go back to Tizen Studio and make sure you are connected at the top of tizen studio
19. Click File -> Open Projects from File System -> jwplayer-tizen-app/tizen-demo-app/app
20. Right click the project and select "Build Signed Package"
21. Right click the project and select "Run As" -> "Tizen Web Application"
22. The App should launch on your tv

## Troubleshooting
* On the tv go to "Apps" and long press on the JWPlayer App and hit uninstall
* Make sure to turn off dark mode for errors dialogs on mac
* Double check that you are connected to the tv in Tizen Studio and tools -> Device Manager
