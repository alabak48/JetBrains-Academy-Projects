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

        // Test 10 - Check overflow y of slider
        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.slider')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.gridAutoFlow === "column" ?
                correct() :
                wrong(`Your grid flow is incorrect.`)
        }),

        // Test 11 - Checks body min-height

        this.page.execute(async() => {
            this.articleObj = await document.getElementsByTagName('body')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.minHeight === "864.9px" ?
                correct() :
                wrong(`Check the minimum height of the body element`)
        }),

        // Test 12 - Checks body display flex

        this.page.execute(async() => {
            this.articleObj = await document.getElementsByTagName('body')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.display === "flex" ?
                correct() :
                wrong(`Body element should be set to flexible.`)
        }),

        // Test 13 - Checks body flex-direction
        this.page.execute(async() => {
            this.articleObj = await document.getElementsByTagName('body')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.flexDirection === "column" ?
                correct() :
                wrong(`Check the flex direction of the body element.`)
        }),

        // Test 14 - Checks body justify content
        this.page.execute(async() => {
            this.articleObj = await document.getElementsByTagName('body')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.justifyContent === "center" ?
                correct() :
                wrong(`Body element content should be set to the center.`)
        }),

        // Test 15 - Checks body align items

        this.page.execute(async() => {
            this.articleObj = await document.getElementsByTagName('body')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.alignItems === "center" ?
                correct() :
                wrong(`Align body element items to the center`)
        })


    ]}

            it("Test stage", async () => {
                    await new Test().runTests()
                }
            ).timeout(30000)