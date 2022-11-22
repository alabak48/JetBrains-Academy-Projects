const path = require('path');
const pagePath = path.join(__dirname, '../src/index.html');
const {StageTest, correct, wrong} = require('hs-test-web');

class Test extends StageTest {

    page = this.getPage(pagePath)
// Test  - checks a hover
    tests = [
this.node.execute(async () => {
        const a = await this.page.findBySelector('a');
        await a.hover();
        const hoverLink = await this.page.findBySelector('a:hover');

        const styles = await hoverLink.getComputedStyles();

        return styles.opacity === 1 ?
         correct() :
         wrong(`Please check hovering`)
}),
        // Checks font family, font color and font size of heading 1 element
        this.page.execute(async() => {
            let fontsHeading = await this.document.getElementsByTagName('h1');

            let fontsColor = fontsHeading.color === 'rgb(62, 62, 62)' && fontsHeading.fontSize === '29pt' && fontsHeading.fontFamily === '\'Cardo\', serif;';
            return fontsColor ?
                correct() :
                wrong('Please check font and color of your heading')
        })]}

it("Test stage", async () => {
        await new Test().runTests()
    }
).timeout(30000);