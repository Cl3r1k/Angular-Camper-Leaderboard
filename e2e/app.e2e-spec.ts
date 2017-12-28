import { AppPage } from './app.po';

describe('angular-camper-leaderboard App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display `Camper Leaderboard` message', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('Camper Leaderboard');
    });
});
