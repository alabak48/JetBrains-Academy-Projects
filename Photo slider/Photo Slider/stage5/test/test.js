const path = require('path');
const pagePath = path.join(__dirname, '../src/index.html');
const {StageTest, correct, wrong} = require('hs-test-web');

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

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

        // Test 10 - check slider position
        this.node.execute(async () => {
            let sliderCoords = await this.page.evaluate(async () => {
                let slider = document.getElementsByClassName('slider')[0];
                return [slider.getBoundingClientRect().x, slider.getBoundingClientRect().y];
            });
            return sliderCoords[0] === 545 && sliderCoords[1] === 181.84375 ?
                correct() :
                wrong(`Check position of slider container.`);
        }),

        // Test 11 - Check container 'slide' width
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
                wrong(`Check dimensions of .slide (now you have width=${slide.width},
         but according to the dimensions of the window, its dimensions should be: width=${slide.neededWidth}`);
        }),

        // Test 12 - Check container 'slide' height
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
                wrong(`Check dimensions of .slide (now you have height=${slide.height},
         but according to the dimensions of the window, its dimensions should be: height=${slide.neededHeight}`);
        }),


        // Test 13 - Check overflow x of slider
        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.slider')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.overflowX === "auto" ?
                correct() :
                wrong(`Check overflow x of slider.`)
        }),

        // Test 14 - Check overflow y of slider
        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.slider')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.overflowY === "hidden" ?
                correct() :
                wrong(`Check overflow y of slider You answer.`)
        }),


        // Test 15 - Check box-shadow of slider
        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.slider')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.boxShadow === "rgba(0, 0, 0, 0.2) 0px 2px 15px 0px, rgba(0, 0, 0, 0.25) 0px 2px 20px 0px" ?
                correct() :
                wrong(`Set box shadow to the slider container.`)
        }),


        // Test 16 - Check background repeat

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.slide')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.backgroundRepeat === "no-repeat" ?
                correct() :
                wrong(`The background picture is repeated.`)
        }),

        // Test 17 - Check background size

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.slide')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.backgroundSize === "cover" ?
                correct() :
                wrong(`The background image must cover the entire slide container.`)
        }),

        // Test 18 - Check background position

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.slide')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.backgroundPosition === "50% 50%" ?
                correct() :
                wrong(`The background image should be placed in the center.`)
        }),

        // Test 19   - Check scroll behavior

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.slider')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.scrollBehavior === "smooth" ?
                correct() :
                wrong(`The scroll of the slider should be smooth.`)
        }),

        // Test 20 - Check scroll snap align

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.slide')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.scrollSnapAlign === "start" ?
                correct() :
                wrong(`Set scroll from the start`)
        }),

        // Test 21 - Check dots container

        this.node.execute(async() => {
            const wrapper = await this.page.findBySelector('.dots');
            return wrapper ?
                correct() :
                wrong(`Your page must contain a dots container.`)
        }),

        // Test 22 - Check caption container

        this.node.execute(async() => {
            const wrapper = await this.page.findBySelector('.caption');
            return wrapper ?
                correct() :
                wrong(`Your page must contain a caption container.`)
        }),

        // Test 23 - Check dots position

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.dots')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.position === "absolute" ?
                correct() :
                wrong(`Wrong position of dots container.`)
        }),

        // Test 24 - Check dots bottom

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.dots')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.bottom === "20px" ?
                correct() :
                wrong(`Your dots should be at the bottom of the slider.`)
        }),

        // Test 25 - Check dots left

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.dots')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.left === "415px" ?
                correct() :
                wrong(`Your dots should be at the center of the slider.`)
        }),

        // Test 26 - Check dots transform

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.dots')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.transform === "matrix(1, 0, 0, 1, -27, 0)" ?
                correct() :
                wrong(`Move the dots element exactly at the center of the main container.`)
        }),

        // Test 27 - Check dots gap

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.dots')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.gap === "15px" ?
                correct() :
                wrong(`The gap between the dots should be set to 15px.`)
        }),

        // Test 28 - Check dots z-index

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.dots')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.zIndex === "1" ?
                correct() :
                wrong(`Set the z-index of the dots container to 1.`)
        }),

        // Test 29 - Checks dots display

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.dots')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.display === "flex" ?
                correct() :
                wrong(`Dots container should be flexible.`)
        }),

        // Test 30 - Checks item alignment

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.dots')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.alignItems === "center" ?
                correct() :
                wrong(`Wrong item alignment`)
        }),

        // Test 31 - Checks justify content

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.dots')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.justifyContent === "center" ?
                correct() :
                wrong(`Wrong content alignment`)
        }),

        // Test 32 - Checks 3 a elements

        this.page.execute(() => {
            this.articleObj = document.getElementsByTagName('a');

            return this.articleObj.length === 3 ?
                correct() :
                wrong(`Your page should contain 3 a elements inside .dots container.`)
        }),

        // Test 33 - Checks width and height of a elements

        this.page.execute(async() => {
            this.articleObj = await document.getElementsByTagName('a')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.width === "8px" && styles.height === "8px" ?
                correct() :
                wrong(`Check width and height of the a element`)
        }),

        // Test 34 - Checks border radius of a elements

        this.page.execute(async() => {
            this.articleObj = await document.getElementsByTagName('a')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.borderRadius === "50%" ?
                correct() :
                wrong(`Your dots should be round`)
        }),

        // Test 35 - Checks background color of a elements

        this.page.execute(async() => {
            this.articleObj = await document.getElementsByTagName('a')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.backgroundColor === "rgb(255, 255, 255)" ?
                correct() :
                wrong(`Your dots should be white.`)
        }),


        // Test 36 - Checks opacity of a elements

        this.page.execute(async() => {
            this.articleObj = await document.getElementsByTagName('a')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.opacity === "0.75" ?
                correct() :
                wrong(`Your dots should be transparent`)
        }),

        // Test 37 - Checks transition of a elements

        this.page.execute(async() => {
            this.articleObj = await document.getElementsByTagName('a')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.transition === "opacity 0.25s ease 0s" ?
                correct() :
                wrong(`Smoothly change the opacity state of dots`)
        }),


        // Test 38 - Checks cursor pointer

        this.page.execute(async() => {
            this.articleObj = await document.getElementsByTagName('a')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.cursor === "pointer" ?
                correct() :
                wrong(`Show when the mouse pointer is over the dots`)
        }),

        // Test 39 - Checks dots hovering

        this.node.execute(async () => {
            const a = await this.page.findBySelector('a');
            await a.hover();
            sleep(400);
            const hoverA = await this.page.findBySelector('a:hover');

            const styles = await hoverA.getComputedStyles();

            return styles.opacity=== '1' ?
                correct() :
                wrong(`Please check the dots hovering.`)
        }),


        // Test 40 - Checks caption display block

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.caption')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.display === "block" ?
                correct() :
                wrong(`Displays element as a block element`)
        }),

        // Test 41 - Checks margin top of a caption container

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.caption')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.marginTop === "25px" ?
                correct() :
                wrong(`Check the top margin of container element`)
        }),

        // Test 42 - Checks margin top of a caption container

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.caption')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.backgroundColor === "rgba(0, 0, 0, 0)" ?
                correct() :
                wrong(`Your caption should be gray.`)
        }),

        // Test 43 - Checks letter spacing of caption

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.caption')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.letterSpacing === "0.5px" ?
                correct() :
                wrong(`Space the letters by 0.5px.`)
        }),

        // Test 44 - Checks font-size of h1 element

        this.page.execute(async() => {
            this.articleObj = await document.getElementsByTagName('h1')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.fontSize === "38.6667px" ?
                correct() :
                wrong(`Check font size of main heading.`)
        }),

        // Test 45 - Checks color of h1 element

        this.page.execute(async() => {
            this.articleObj = await document.getElementsByTagName('h1')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.color === "rgb(62, 62, 62)" ?
                correct() :
                wrong(`Check color of main heading.`)
        }),

        // Test 46 - Checks font-family of h1 element

        this.page.execute(async() => {
            this.articleObj = await document.getElementsByTagName('h1')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.fontFamily !== `Cardo, serif` ?
                wrong(`Check color of main heading.`) : correct()
        }),

    ]};

it("Test stage", async () => {
        await new Test().runTests()
    }
).timeout(30000)