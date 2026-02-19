from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    try:
        # Set viewport
        page.set_viewport_size({"width": 1280, "height": 720})

        # 1. Verify Arcade Page
        print("Navigating to Arcade...")
        page.goto("http://localhost:3000/arcade")

        # Click the first "Boot Simulation" button
        print("Clicking 'Boot Simulation'...")
        page.locator("button:has-text('Boot Simulation')").first.click()

        # Wait for modal to appear
        print("Waiting for game modal...")
        # Look for the modal container
        page.wait_for_selector(".fixed.inset-0")

        # Check for ">>" text inside the modal header
        # The modal header contains ">> {Title}"
        # We can look for the span containing ">>"
        print("Checking for '>>'...")
        # Use exact text match for robustness
        # Playwright's locator("text=>>") might fail if not quoted correctly
        # Let's try locating by text content explicitly
        locator = page.locator("h3 span", has_text=">>")
        if locator.count() > 0:
            print("Found '>>' in h3 span.")
        else:
            print("Could not find '>>' in h3 span.")

        # Take screenshot of Arcade
        page.screenshot(path="arcade_verification.png")
        print("Arcade screenshot saved.")

        # Close modal
        page.keyboard.press("Escape")

        # 2. Verify Intelligence Page
        print("Navigating to Intelligence...")
        page.goto("http://localhost:3000/intelligence")

        # Wait for title
        page.wait_for_selector("text=Intelligence Hub")

        # Check for "//" text in the model info
        print("Checking for '//'...")
        # The text is likely "// llama-3.3-70b-versatile"
        # We look for the span containing "//"
        locator = page.locator("span", has_text="//")

        # Wait for it to be visible
        locator.first.wait_for()

        if locator.count() > 0:
            print("Found '//' in span.")
        else:
            print("Could not find '//' in span.")

        page.screenshot(path="intelligence_verification.png")
        print("Intelligence screenshot saved.")

    except Exception as e:
        print(f"Error: {e}")
        page.screenshot(path="error_screenshot.png")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
