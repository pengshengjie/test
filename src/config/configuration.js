export const siteConfig = {
    siteName: 'Frontend',
    siteIcon: 'ion-aperture',
    footerText: `Frontend @ ${new Date().getFullYear()}`,
    enableAnimatedRoute: false,
    apiUrl: 'http://yoursite.com/api/',
    google: {
        analyticsKey: 'UA-xxxxxxxxx-1',
    },
    dashboard: '/Dashboard',
    avatarUrl: '../../'
};

export const themeSetting = {
    default: {
        sider: {
            buttonColor: 'rgb(0, 22, 104)',
            backgroundColor: '#222653',
            textColor: '#ffffff',
        },
        topNav: {
            buttonColor: '#ffffff',
            backgroundColor: '#ffffff',
        }
    }

}
