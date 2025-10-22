#!/bin/bash

# E2E Test Runner Script for Fluentory
# This script provides easy commands to run E2E tests with different configurations

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if dev server is running
check_dev_server() {
    if curl -s http://localhost:3000 > /dev/null; then
        print_success "Dev server is running on http://localhost:3000"
        return 0
    else
        print_warning "Dev server is not running. Starting it now..."
        return 1
    fi
}

# Function to start dev server in background
start_dev_server() {
    print_status "Starting development server..."
    npm start &
    DEV_SERVER_PID=$!
    
    # Wait for server to start
    print_status "Waiting for server to start..."
    for i in {1..30}; do
        if curl -s http://localhost:3000 > /dev/null; then
            print_success "Dev server started successfully"
            return 0
        fi
        sleep 2
    done
    
    print_error "Failed to start dev server"
    return 1
}

# Function to stop dev server
stop_dev_server() {
    if [ ! -z "$DEV_SERVER_PID" ]; then
        print_status "Stopping development server..."
        kill $DEV_SERVER_PID 2>/dev/null || true
        print_success "Dev server stopped"
    fi
}

# Function to install Playwright browsers
install_browsers() {
    print_status "Installing Playwright browsers..."
    npx playwright install
    print_success "Playwright browsers installed"
}

# Function to run tests with device filter
run_tests() {
    local device_filter="$1"
    local test_file="$2"
    local additional_args="$3"
    
    print_status "Running E2E tests..."
    
    if [ ! -z "$test_file" ]; then
        print_status "Running specific test file: $test_file"
        npx playwright test "$test_file" $additional_args
    elif [ ! -z "$device_filter" ]; then
        print_status "Running tests for device group: $device_filter"
        npx playwright test --project="$device_filter" $additional_args
    else
        print_status "Running all tests"
        npx playwright test $additional_args
    fi
    
    print_success "Tests completed"
}

# Function to show help
show_help() {
    echo "Fluentory E2E Test Runner"
    echo ""
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo ""
    echo "Commands:"
    echo "  install          Install Playwright browsers"
    echo "  dev              Start dev server and run tests"
    echo "  mobile           Run tests on mobile devices only"
    echo "  desktop          Run tests on desktop browsers only"
    echo "  tablet           Run tests on tablet devices only"
    echo "  all              Run tests on all devices"
    echo "  auth             Run authentication tests only"
    echo "  words            Run words management tests only"
    echo "  flashcards       Run flashcard tests only"
    echo "  settings         Run settings tests only"
    echo "  accessibility    Run accessibility tests only"
    echo "  ui               Run tests with Playwright UI"
    echo "  debug            Run tests in debug mode"
    echo "  headed           Run tests in headed mode (visible browser)"
    echo "  report           Show test report"
    echo "  help             Show this help message"
    echo ""
    echo "Options:"
    echo "  --headed         Run tests with visible browser"
    echo "  --debug          Run tests in debug mode"
    echo "  --ui             Run tests with Playwright UI"
    echo "  --grep PATTERN   Run tests matching pattern"
    echo ""
    echo "Examples:"
    echo "  $0 install                    # Install Playwright browsers"
    echo "  $0 dev                        # Start dev server and run all tests"
    echo "  $0 mobile --headed            # Run mobile tests with visible browser"
    echo "  $0 auth --debug               # Debug authentication tests"
    echo "  $0 all --grep 'login'         # Run all tests matching 'login'"
}

# Main script logic
main() {
    local command="$1"
    local additional_args=""
    
    # Parse additional arguments
    shift
    while [[ $# -gt 0 ]]; do
        case $1 in
            --headed|--debug|--ui)
                additional_args="$additional_args $1"
                shift
                ;;
            --grep)
                additional_args="$additional_args $1 $2"
                shift 2
                ;;
            *)
                additional_args="$additional_args $1"
                shift
                ;;
        esac
    done
    
    case "$command" in
        install)
            install_browsers
            ;;
        dev)
            if ! check_dev_server; then
                start_dev_server
                trap stop_dev_server EXIT
            fi
            run_tests "" "" "$additional_args"
            ;;
        mobile)
            run_tests "Mobile Chrome,Mobile Safari" "" "$additional_args"
            ;;
        desktop)
            run_tests "chromium,firefox,webkit" "" "$additional_args"
            ;;
        tablet)
            run_tests "iPad,iPad Mini" "" "$additional_args"
            ;;
        all)
            run_tests "" "" "$additional_args"
            ;;
        auth)
            run_tests "" "auth.spec.js" "$additional_args"
            ;;
        words)
            run_tests "" "words.spec.js" "$additional_args"
            ;;
        flashcards)
            run_tests "" "flashcards.spec.js" "$additional_args"
            ;;
        settings)
            run_tests "" "settings.spec.js" "$additional_args"
            ;;
        accessibility)
            run_tests "" "accessibility.spec.js" "$additional_args"
            ;;
        ui)
            npx playwright test --ui $additional_args
            ;;
        debug)
            npx playwright test --debug $additional_args
            ;;
        headed)
            npx playwright test --headed $additional_args
            ;;
        report)
            npx playwright show-report
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            print_error "Unknown command: $command"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"
