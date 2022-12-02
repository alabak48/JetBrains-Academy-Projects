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
                let slider = document.getElementsByClassName('slider')[0];
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

            return  Math.abs(slider.width - (slider.neededWidth+30)) < 2 && Math.abs(slider.height - (slider.neededHeight+30)) < 2 ?
                correct() :
                wrong(`Check dimensions of .slider (now you have width=${slider.width} and height=${slider.height},
         but according to the dimensions of the window, its dimensions should be: width=${slider.neededWidth+30} and height=${slider.neededHeight+30}`);
        }),


        // Test 5 - Check max-width 'slider'
        this.node.execute(async () => {
            let slider = await this.page.evaluate(async () => {
                let slider = document.getElementsByClassName('slider')[0];
                let neededSliderWidth = Math.round(window.innerWidth / 100 * 75);
                neededSliderWidth = neededSliderWidth < 320 ? 320 : (neededSliderWidth > 800 ? 800 : neededSliderWidth);

                return {
                    'width': slider.getBoundingClientRect().width,
                    'neededWidth': neededSliderWidth
                }
            });

            return  Math.abs(slider.width - (slider.neededWidth+30)) < 2 ?
                correct() :
                wrong(`Check dimensions of .slider (now you have width=${slider.width},
         but according to the dimensions of the window, its dimensions should be: width=${slider.neededWidth+30}`);
        }),

        // Test 6 - Check container '.slide-1'

        this.node.execute(async() => {
            const wrapper = await this.page.findById('slide-1');
            return wrapper ?
                correct() :
                wrong(`Your page must contain a slide-1 container.`)
        }),

        // Test 7 - Check container '.slide-2'

        this.node.execute(async() => {
            const wrapper = await this.page.findById('slide-2');
            return wrapper ?
                correct() :
                wrong(`Your page must contain a slide-2 element.`)
        }),

        // Test 8 - Check container '.slide-3'

        this.node.execute(async() => {
            const wrapper = await this.page.findById('slide-3');
            return wrapper ?
                correct() :
                wrong(`Your page must contain a slide-3 element.`)
        }),

        // Test 9 - Check container 'slide' width
        this.node.execute(async () => {
            let slide = await this.page.evaluate(async () => {
                let slide = document.getElementsByClassName('slide')[0];
                let neededSliderWidth = Math.round(window.innerWidth / 100 * 75);
                neededSliderWidth = neededSliderWidth < 320 ? 320 : (neededSliderWidth > 800 ? 800 : neededSliderWidth);

                return {
                    'width': slide.getBoundingClientRect().width,
                    'neededWidth': neededSliderWidth
                }
            });

            return  Math.abs(slide.width - (slide.neededWidth)) < 2 ?
                correct() :
                wrong(`Check dimensions of .slider (now you have width=${slide.width},
         but according to the dimensions of the window, its dimensions should be: width=${slide.neededWidth}`);
        }),

        // Test 10 - Check container 'slide' height
        this.node.execute(async () => {
            let slide = await this.page.evaluate(async () => {
                let slide = document.getElementsByClassName('slide')[0];
                let neededSliderHeight = Math.round(window.innerHeight / 100 * 75);
                neededSliderHeight = neededSliderHeight < 320 ? 320 : (neededSliderHeight > 800 ? 800 : neededSliderHeight);

                return {
                    'height': slide.getBoundingClientRect().height,
                    'neededHeight': neededSliderHeight
                }
            });

            return  Math.abs(slide.height - (slide.neededHeight+79)) < 2 ?
                correct() :
                wrong(`Check dimensions of .slider (now you have height=${slide.height},
         but according to the dimensions of the window, its dimensions should be: height=${slide.neededHeight}`);
        }),

        // Test 11 - Check background-size
        this.page.execute(() => {
            this.articleObj = document.getElementsByClassName('slide')
            let styles = window.getComputedStyle(this.articleObj[0]);
            if(styles.backgroundPosition.length !== 'center'){
                return wrong('wrong background position')
            }
                })

    ]}

it("Test stage", async () => {
        await new Test().runTests()
    }
).timeout(30000)