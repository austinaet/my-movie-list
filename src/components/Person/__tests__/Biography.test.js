import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Biography from '../Biography';

const getBio = (type = null) => {
    switch (type) {
        case 'short':
            return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec ipsum magna. Aliquam erat volutpat. Phasellus nec bibendum lorem. Fusce metus justo, porta vitae ligula sed, lobortis condimentum nulla. Sed tincidunt laoreet diam, luctus molestie tortor ullamcorper eget. Vivamus nisl nibh, faucibus ullamcorper dolor vel, aliquet porta magna. Donec neque.';
        case 'long':
            return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nibh ex, ullamcorper id purus at, porta iaculis mi. Praesent tortor dolor, sollicitudin ac massa cursus, ultricies rhoncus leo. Phasellus sit amet purus magna. In tempus massa at malesuada posuere. Praesent arcu leo, ultricies ut dolor id, pellentesque mattis magna. Maecenas consectetur nunc quis sem gravida, sed venenatis ipsum iaculis. Phasellus a mauris lobortis nulla consectetur hendrerit. Quisque venenatis facilisis accumsan. Ut tincidunt ut justo vitae tincidunt. Vestibulum vel condimentum est.';
        default:
            return '';
    }
};

describe('No biography (i.e., empty string)', () => {
    let bio;
    beforeAll(() => {
        bio = getBio();
    });

    beforeEach(() => {
        render(<Biography biography={bio} />);
    });

    test('Biography is rendered on screen', () => {
        const biograhpy = screen.getByText('No biography written yet.');
        expect(biograhpy).toBeInTheDocument();
    });

    test('Show More button is not rendered', () => {
        const button = screen.queryByTestId('expandBioButton');
        expect(button).toBeNull();
    });
});

describe('Short biography (biography length <= 550 characters)', () => {
    let bio;
    beforeAll(() => {
        bio = getBio('short');
    });

    beforeEach(() => {
        render(<Biography biography={bio} />);
    });

    test('Biography is rendered on screen', () => {
        const biograhpy = screen.getByText(bio);
        expect(biograhpy).toBeInTheDocument();
    });

    test('Show more button is not rendered', () => {
        const button = screen.queryByTestId('expandBioButton');
        expect(button).toBeNull();
    });
});

describe('Long biography (biography length > 550 characters)', () => {
    let bio;
    beforeAll(() => {
        bio = getBio('long');
    });

    beforeEach(() => {
        render(<Biography biography={bio} />);
    });

    test('Biography is rendered on screen', () => {
        const biograhpy = screen.getByText(bio.substring(0, 497) + '...');
        expect(biograhpy).toBeInTheDocument();
    });

    test('Show more button is present', () => {
        const button = screen.getByTestId('expandBioButton');
        expect(button).toBeInTheDocument();
        const buttonText = within(button).getByText('Show More');
        expect(buttonText).toBeInTheDocument();
    });

    test(`Clicking 'Show More' reveals full biography`, () => {
        const button = screen.getByTestId('expandBioButton');

        userEvent.click(button);
        const showLessButton = within(button).getByText('Show Less');
        expect(showLessButton).toBeInTheDocument();

        const biograhpy = screen.getByText(bio);
        expect(biograhpy).toBeInTheDocument();
    });

    test(`Clicking 'Show Less' reduces biography length`, () => {
        const button = screen.getByTestId('expandBioButton');
        userEvent.click(button);
        userEvent.click(button);

        const showMoreButton = within(button).getByText('Show More');
        expect(showMoreButton).toBeInTheDocument();

        const biograhpy = screen.getByText(bio.substring(0, 497) + '...');
        expect(biograhpy).toBeInTheDocument();
    });
});
