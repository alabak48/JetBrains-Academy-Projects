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

        // Test 9 - Check border of a slider

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.slider')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.border === "15px solid rgba(255, 255, 255, 0.235)" ?
                correct() :
                wrong(`Set border to the slider as shown on the image.`)
        }),


        // Test 10 - Check slider position
        this.node.execute(async () => {
            let slider = await this.page.evaluate(async () => {
                let slider = document.getElementsByClassName('slider')[0];
                let bodyWidth = Math.round(window.innerWidth);
                return {
                    'width': slider.getBoundingClientRect().width,
                    'xCoor': slider.getBoundingClientRect().x,
                    'neededBodyWidth': bodyWidth

                }
            });
            return Math.abs((slider.neededBodyWidth - slider.width) / 2) == slider.xCoor ?
                correct() :
                wrong(`Check position of the slider container  ${(slider.neededBodyWidth - slider.width) / 2} ${slider.width} ${slider.xCoor}`);

        }),



    ]}
            it("Test stage", async () => {
                    await new Test().runTests()
                }
            ).timeout(30000)