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

        // Test 4 - Check width and height of container '.slider'
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

        // Test 5 - Check max-width of container '.slider'
        this.node.execute(async () => {
            let slider = await this.page.evaluate(async () => {
                let slider = document.getElementById('slider');
                let neededSliderMaxWidth = Math.round(window.innerWidth / 100 * 75);
                neededSliderMaxWidth = neededSliderMaxWidth < 320 ? 320 : (neededSliderMaxWidth > 800 ? 800 : neededSliderMaxWidth);
                return {
                    'width': slider.getBoundingClientRect().width,
                    'neededMaxWidth': neededSliderMaxWidth
                }
            });

            return  Math.abs(slider.MaxWidth - slider.neededMaxWidth) < 2 ?
                correct() :
                wrong(`Check dimensions of #slider (now you have max-width=${slider.width},
                 but according to the dimensions of the window, its dimensions should be: max-width=${slider.neededWidth}`);
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

            if (containerComputedStyles.box-shadow !== '0 2px 15px rgba(0, 0, 0, 0.2), 0 2px 20px rgba(0, 0, 0, 0.25)') {
                return wrong('Please check box-shadow properties')
            }


            // Test 8 - Check container '.slide-1'

            this.node.execute(async() => {
                const wrapper = await this.page.findById('.slide-1');
                return wrapper ?
                    correct() :
                    wrong(`Your page must contain a slide-1 element.`)
            }),

                // Test 9 - Check container '.slide-2'

                this.node.execute(async() => {
                    const wrapper = await this.page.findById('.slide-2');
                    return wrapper ?
                        correct() :
                        wrong(`Your page must contain a slide-2 element.`)
                }),

                // Test 10 - Check container '.slide-3'

                this.node.execute(async() => {
                    const wrapper = await this.page.findById('.slide-3');
                    return wrapper ?
                        correct() :
                        wrong(`Your page must contain a slide-3 element.`)
                }),

                //Test 11 - Check Images
                this.page.execute(() => {
                    let backgroundImage = window.getComputedStyle(this.summary).backgroundImage
                    return  backgroundImage === 'url()' ?
                        correct() :
                        wrong(`Please, insert background images`)
                }),

                //Test 12 - Check min-height
                this.page.execute(() => {
                    let minHeight = window.getComputedStyle(this.summary).minHeight;
                    return  minHeight === '100vh)' ?
                        correct() :
                        wrong(`Please, check minimum height properties.`)
                }),
                //Test 13 - Check display
                this.page.execute(() => {
                    let display = window.getComputedStyle(this.summary).display;
                    return  display === 'flex' ?
                        correct() :
                        wrong(`Please, check the display property.`)
                }),
                //Test 14 - check flex-direction
                this.page.execute(() => {
                    let flexDirection = window.getComputedStyle(this.summary).flexDirection;
                    return  flexDirection === 'column' ?
                        correct() :
                        wrong(`Please, check flex direction.`)
                }),
                //Test 15 - check justify-content
                this.page.execute(() => {
                    let justifyContent = window.getComputedStyle(this.summary).justifyContent;
                    return  justifyContent === 'center' ?
                        correct() :
                        wrong(`Please, check content alignment.`)
                }),
                //Test 16 - check flex-direction
                this.page.execute(() => {
                    let alignItems = window.getComputedStyle(this.summary).alignItems;
                    return  alignItems === 'center' ?
                        correct() :
                        wrong(`Please, check item alignment.`)
                }),



            it("Test stage", async () => {
                    await new Test().runTests()
                }
            ).timeout(30000);}