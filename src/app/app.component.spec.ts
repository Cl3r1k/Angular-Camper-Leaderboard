import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AppComponent, User } from './app.component';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            imports: [HttpClientTestingModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create the app (async)', async(() => {
        // Arrange

        // Act

        // Assert
        expect(component).toBeTruthy();
    }));

    it('should render title in a h2 tag (async)', async(() => {
        // Arrange

        // Act
        const compiled = fixture.debugElement.nativeElement;

        // Assert
        expect(compiled.querySelector('h2').textContent).toContain('Camper Leaderboard');
    }));

    it(`should have initial params (async)`, async(() => {
        // Arrange

        // Act

        // Assert
        expect(component.dataLoaded).toEqual(false);
        expect(component.hiddenSocialIcons).toBe(false, 'actually hiddenSocialIcons should be true, but changed in ngOnInit');
        expect(component.iconsHovered).toEqual(false);
        expect(component.isDesc).toEqual(false);
        expect(component.API_URLS).toEqual([
            'https://fcctop100.herokuapp.com/api/fccusers/top/recent',
            'https://fcctop100.herokuapp.com/api/fccusers/top/alltime'
        ]);
        expect(component.usersList).toEqual([]);
    }));

    describe('#initApp', () => {
        it(`should init app with initial params (async)`, async(() => {
            // Arrange

            // Act
            component.initApp();

            // Assert
            expect(component.hiddenSocialIcons).toEqual(false);
        }));
    });

    describe('#doSearch', () => {
        it(`should perform search with input('recent') (async)`, async(() => {
            // Arrange
            component.state = 2;

            // Act
            component.doSearch('recent');

            // Assert
            expect(component.state).toEqual(1);
            expect(component.isDesc).toEqual(false);
        }));

        it(`should perform search with input('alltime') (async)`, async(() => {
            // Arrange
            component.state = 1;

            // Act
            component.doSearch('alltime');

            // Assert
            expect(component.state).toEqual(2);
            expect(component.isDesc).toEqual(false);
        }));
    });

    describe('#sortBy', () => {
        it(`should sort ascending Array by given name('recent') (async)`, async(() => {
            // Arrange
            component.isDesc = false;
            component.usersList = [
                new User('User1', 35, 555, 'https://'),
                new User('User2', 71, 732, 'https://'),
                new User('User3', 11, 6555, 'https://'),
                new User('User4', 95, 155, 'https://')
            ];

            // Act
            component.sortBy('recent');

            // Assert
            expect(component.isDesc).toEqual(true);
            expect(component.usersList).toEqual([
                new User('User3', 11, 6555, 'https://'),
                new User('User1', 35, 555, 'https://'),
                new User('User2', 71, 732, 'https://'),
                new User('User4', 95, 155, 'https://')
            ]);
        }));

        it(`should sort descending Array by given name('alltime') (async)`, async(() => {
            // Arrange
            component.isDesc = true;
            component.usersList = [
                new User('User1', 35, 555, 'https://'),
                new User('User2', 71, 732, 'https://'),
                new User('User3', 11, 6555, 'https://'),
                new User('User4', 95, 155, 'https://')
            ];

            // Act
            component.sortBy('alltime');

            // Assert
            expect(component.isDesc).toEqual(false);
            expect(component.usersList).toEqual([
                new User('User3', 11, 6555, 'https://'),
                new User('User2', 71, 732, 'https://'),
                new User('User1', 35, 555, 'https://'),
                new User('User4', 95, 155, 'https://')
            ]);
        }));
    });

    describe('#toggleSocialIconsState', () => {
        it(`should toggle social icon state (async)`, async(() => {
            // Arrange
            component.hiddenSocialIcons = false;

            // Act
            component.toggleSocialIconsState();

            // Assert
            expect(component.hiddenSocialIcons).toEqual(true);
        }));
    });
});
