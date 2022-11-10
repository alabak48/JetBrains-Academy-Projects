const path = require('path');
const pagePath = path.join(__dirname, '../src/index.html');
const {StageTest, correct, wrong} = require('hs-test-web');

class Test extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        // Test 1 - Check container '.slider-wrapper'
        this.node.execute(async() => {
            const wrapper = await this.page.findBySelector('.slider-wrapper');
            return wrapper ?
                correct() :
                wrong(`Your page must contain a slider-wrapper element.`)
        }),

        // Test 2 - Check container '.slider'

        this.node.execute(async() => {
            const wrapper = await this.page.findBySelector('.slider');
            return wrapper ?
                correct() :
                wrong(`Your page must contain a slider element.`)
        }),

        // Test 3 - Check h1 element
        this.page.execute(() => {
            this.mainTitle = document.getElementsByTagName('h1');
            return this.mainTitle ?
                correct() :
                wrong(`Your page must contain main title`)
        }),

        // Test 4 - Check width and height of container 'slider'
        this.node.execute(async () => {
            let slider = await this.page.evaluate(async () => {
                let slider = document.getElementById('slider');
                let neededSliderWidth = Math.round(window.innerWidth / 100 * 75);
                let neededSliderHeight = Math.round(window.innerHeight / 100 * 75);
                neededSliderWidth = neededSliderWidth < 320 ? 320 : (neededSliderWidth > 800 ? 800 : neededSliderWidth);
                neededSliderHeight = neededSliderHeight < 240 ? 240 : (neededSliderHeight > 600 ? 600 : neededSliderHeight);
                return {
                    'width': slider.getBoundingClientRect().width,
                    'height': slider.getBoundingClientRect().height,
                    'neededWidth': neededSliderWidth,
                    'neededHeight': neededSliderHeight
                }
            });

            return  Math.abs(slider.width - slider.neededWidth) < 2 && Math.abs(slider.height - slider.neededHeight) < 2 ?
                correct() :
                wrong(`Check dimensions of #slider (now you have width=${slider.width} and height=${slider.height},
                 but according to the dimensions of the window, its dimensions should be: width=${slider.neededWidth} and height=${slider.neededHeight}`);
        }),

        // Test 5 - Check max-width of container 'slider'
        this.node.execute(async () => {
        const containerComputedStyles = await container.getComputedStyles()

        if (containerComputedStyles.max-width: !== 'clamp(320px, 75vw, 800px)') {
        return wrong('Wrong maximum width of the slider.')
        }),

       // Test 6 - Check border
            this.page.execute(() => {
                let border = window.getComputedStyle(this.summary).border;
                return  border === '15px solid rgba(255, 255, 255, 0.234)' ?
                    correct() :
                    wrong(`Please, check border properties.`)
            }),

                // Test 7 - Check box-shadow
                this.node.execute(async () => {
                    const containerComputedStyles = await container.getComputedStyles()

                    if (containerComputedStyles.box-shadow: !== '0 2px 15px rgba(0, 0, 0, 0.2), 0 2px 20px rgba(0, 0, 0, 0.25)') {
                        return wrong('Please check box-shadow properties')
                    }),


    ]

}
}

it("Test stage", async () => {
        await new Test().runTests()
    }
).timeout(30000);