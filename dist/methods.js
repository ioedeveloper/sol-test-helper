"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContractFactory = exports.getContractAt = exports.getSigner = exports.getSigners = exports.getContractFactoryFromArtifact = exports.getContractAtFromArtifact = void 0;
// @ts-ignore
var ethers_1 = require("ethers");
var ganache = __importStar(require("ganache"));
var artifacts_helper_1 = require("./artifacts-helper");
var signer_1 = require("./signer");
var initializeProvider = function () {
    global.ganacheProvider = ganache.provider({ logging: { quiet: true } });
};
var isFactoryOptions = function (signerOrOptions) {
    if (!signerOrOptions || signerOrOptions === undefined || signerOrOptions instanceof ethers_1.ethers.Signer)
        return false;
    return true;
};
var isArtifact = function (artifact) {
    var contractName = artifact.contractName, sourceName = artifact.sourceName, abi = artifact.abi, bytecode = artifact.bytecode, deployedBytecode = artifact.deployedBytecode, linkReferences = artifact.linkReferences, deployedLinkReferences = artifact.deployedLinkReferences;
    return (typeof contractName === "string" &&
        typeof sourceName === "string" &&
        Array.isArray(abi) &&
        typeof bytecode === "string" &&
        typeof deployedBytecode === "string" &&
        linkReferences !== undefined &&
        deployedLinkReferences !== undefined);
};
function linkBytecode(artifact, libraries) {
    var bytecode = artifact.bytecode;
    for (var _i = 0, libraries_1 = libraries; _i < libraries_1.length; _i++) {
        var _a = libraries_1[_i], sourceName = _a.sourceName, libraryName = _a.libraryName, address = _a.address;
        var linkReferences = artifact.linkReferences[sourceName][libraryName];
        for (var _b = 0, linkReferences_1 = linkReferences; _b < linkReferences_1.length; _b++) {
            var _c = linkReferences_1[_b], start = _c.start, length = _c.length;
            bytecode =
                bytecode.substr(0, 2 + start * 2) +
                    address.substr(2) +
                    bytecode.substr(2 + (start + length) * 2);
        }
    }
    return bytecode;
}
var collectLibrariesAndLink = function (artifact, libraries) { return __awaiter(void 0, void 0, void 0, function () {
    var neededLibraries, _i, _a, _b, sourceName, sourceLibraries, _c, _d, libName, linksToApply, _loop_1, _e, _f, _g, linkedLibraryName, linkedLibraryAddress, missingLibraries;
    return __generator(this, function (_h) {
        neededLibraries = [];
        for (_i = 0, _a = Object.entries(artifact.linkReferences); _i < _a.length; _i++) {
            _b = _a[_i], sourceName = _b[0], sourceLibraries = _b[1];
            // @ts-ignore
            for (_c = 0, _d = Object.keys(sourceLibraries); _c < _d.length; _c++) {
                libName = _d[_c];
                neededLibraries.push({ sourceName: sourceName, libName: libName });
            }
        }
        linksToApply = new Map();
        _loop_1 = function (linkedLibraryName, linkedLibraryAddress) {
            // @ts-ignore
            if (!ethers_1.ethers.utils.isAddress(linkedLibraryAddress)) {
                throw new Error("You tried to link the contract ".concat(artifact.contractName, " with the library ").concat(linkedLibraryName, ", but provided this invalid address: ").concat(linkedLibraryAddress));
            }
            var matchingNeededLibraries = neededLibraries.filter(function (lib) {
                return (lib.libName === linkedLibraryName ||
                    "".concat(lib.sourceName, ":").concat(lib.libName) === linkedLibraryName);
            });
            if (matchingNeededLibraries.length === 0) {
                var detailedMessage = void 0;
                if (neededLibraries.length > 0) {
                    var libraryFQNames = neededLibraries
                        .map(function (lib) { return "".concat(lib.sourceName, ":").concat(lib.libName); })
                        .map(function (x) { return "* ".concat(x); })
                        .join("\n");
                    detailedMessage = "The libraries needed are:\n      ".concat(libraryFQNames);
                }
                else {
                    detailedMessage = "This contract doesn't need linking any libraries.";
                }
                throw new Error("You tried to link the contract ".concat(artifact.contractName, " with ").concat(linkedLibraryName, ", which is not one of its libraries.\n      ").concat(detailedMessage));
            }
            if (matchingNeededLibraries.length > 1) {
                var matchingNeededLibrariesFQNs = matchingNeededLibraries
                    .map(function (_a) {
                    var sourceName = _a.sourceName, libName = _a.libName;
                    return "".concat(sourceName, ":").concat(libName);
                })
                    .map(function (x) { return "* ".concat(x); })
                    .join("\n");
                throw new Error("The library name ".concat(linkedLibraryName, " is ambiguous for the contract ").concat(artifact.contractName, ".\n        It may resolve to one of the following libraries:\n        ").concat(matchingNeededLibrariesFQNs, "\n        To fix this, choose one of these fully qualified library names and replace where appropriate."));
            }
            var neededLibrary = matchingNeededLibraries[0];
            var neededLibraryFQN = "".concat(neededLibrary.sourceName, ":").concat(neededLibrary.libName);
            // The only way for this library to be already mapped is
            // for it to be given twice in the libraries user input:
            // once as a library name and another as a fully qualified library name.
            if (linksToApply.has(neededLibraryFQN)) {
                throw new Error("The library names ".concat(neededLibrary.libName, " and ").concat(neededLibraryFQN, " refer to the same library and were given as two separate library links.\n        Remove one of them and review your library links before proceeding."));
            }
            linksToApply.set(neededLibraryFQN, {
                sourceName: neededLibrary.sourceName,
                libraryName: neededLibrary.libName,
                address: linkedLibraryAddress,
            });
        };
        for (_e = 0, _f = Object.entries(libraries); _e < _f.length; _e++) {
            _g = _f[_e], linkedLibraryName = _g[0], linkedLibraryAddress = _g[1];
            _loop_1(linkedLibraryName, linkedLibraryAddress);
        }
        if (linksToApply.size < neededLibraries.length) {
            missingLibraries = neededLibraries
                .map(function (lib) { return "".concat(lib.sourceName, ":").concat(lib.libName); })
                .filter(function (libFQName) { return !linksToApply.has(libFQName); })
                .map(function (x) { return "* ".concat(x); })
                .join("\n");
            throw new Error("The contract ".concat(artifact.contractName, " is missing links for the following libraries:\n      ").concat(missingLibraries));
        }
        // @ts-ignore
        return [2 /*return*/, linkBytecode(artifact, __spreadArray([], linksToApply.values(), true))];
    });
}); };
// Convert output.contracts.<filename>.<contractName> in Artifact object compatible form
var resultToArtifact = function (result) {
    var fullyQualifiedName = result.fullyQualifiedName, artefact = result.artefact;
    return {
        contractName: fullyQualifiedName.split(':')[1],
        sourceName: fullyQualifiedName.split(':')[0],
        abi: artefact.abi,
        bytecode: artefact.evm.bytecode.object,
        deployedBytecode: artefact.evm.deployedBytecode.object,
        linkReferences: artefact.evm.bytecode.linkReferences,
        deployedLinkReferences: artefact.evm.deployedBytecode.linkReferences
    };
};
var getContractFactory = function (contractNameOrABI, bytecode, signerOrOptions) {
    if (signerOrOptions === void 0) { signerOrOptions = null; }
    return __awaiter(void 0, void 0, void 0, function () {
        var contract;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!global.ganacheProvider)
                        initializeProvider();
                    if (!(bytecode && contractNameOrABI)) return [3 /*break*/, 1];
                    return [2 /*return*/, new ethers_1.ethers.ContractFactory(contractNameOrABI, bytecode, signerOrOptions || (new ethers_1.ethers.providers.Web3Provider(ganacheProvider)).getSigner())];
                case 1:
                    if (!(typeof contractNameOrABI === 'string')) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, artifacts_helper_1.getArtifactsByContractName)(contractNameOrABI)];
                case 2:
                    contract = _a.sent();
                    if (contract) {
                        return [2 /*return*/, new ethers_1.ethers.ContractFactory(contract.abi, contract.evm.bytecode.object, signerOrOptions || (new ethers_1.ethers.providers.Web3Provider(ganacheProvider)).getSigner())];
                    }
                    else {
                        throw new Error('Contract artifacts not found');
                    }
                    return [3 /*break*/, 4];
                case 3: throw new Error('Invalid contract name or ABI provided');
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.getContractFactory = getContractFactory;
var getContractAt = function (contractNameOrABI, address, signer) {
    if (signer === void 0) { signer = null; }
    return __awaiter(void 0, void 0, void 0, function () {
        var provider, result, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!global.ganacheProvider)
                        initializeProvider();
                    provider = new ethers_1.ethers.providers.Web3Provider(ganacheProvider);
                    if (!(typeof contractNameOrABI === 'string')) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, artifacts_helper_1.getArtifactsByContractName)(contractNameOrABI)];
                case 2:
                    result = _a.sent();
                    if (result) {
                        return [2 /*return*/, new ethers_1.ethers.Contract(address, result.abi, signer || provider.getSigner())];
                    }
                    else {
                        throw new Error('Contract artifacts not found');
                    }
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    throw e_1;
                case 4: return [3 /*break*/, 6];
                case 5: return [2 /*return*/, new ethers_1.ethers.Contract(address, contractNameOrABI, signer || provider.getSigner())];
                case 6: return [2 /*return*/];
            }
        });
    });
};
exports.getContractAt = getContractAt;
var getSigner = function (address) { return __awaiter(void 0, void 0, void 0, function () {
    var provider, signer;
    return __generator(this, function (_a) {
        if (!global.ganacheProvider)
            initializeProvider();
        provider = new ethers_1.ethers.providers.Web3Provider(ganacheProvider);
        signer = provider.getSigner(address);
        return [2 /*return*/, signer_1.SignerWithAddress.create(signer)];
    });
}); };
exports.getSigner = getSigner;
var getSigners = function () { return __awaiter(void 0, void 0, void 0, function () {
    var provider, accounts, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!global.ganacheProvider)
                    initializeProvider();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                provider = new ethers_1.ethers.providers.Web3Provider(ganacheProvider);
                return [4 /*yield*/, provider.listAccounts()];
            case 2:
                accounts = _a.sent();
                return [4 /*yield*/, Promise.all(accounts.map(function (account) { return getSigner(account); }))];
            case 3: return [2 /*return*/, _a.sent()];
            case 4:
                err_1 = _a.sent();
                throw err_1;
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getSigners = getSigners;
var getContractFactoryFromArtifact = function (artifact, signerOrOptions) { return __awaiter(void 0, void 0, void 0, function () {
    var libraries, signer, linkedBytecode;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!global.ganacheProvider)
                    initializeProvider();
                libraries = {};
                if (!isArtifact(artifact)) {
                    throw new Error("You are trying to create a contract factory from an artifact, but you have not passed a valid artifact parameter.");
                }
                if (isFactoryOptions(signerOrOptions)) {
                    signer = signerOrOptions.signer;
                    libraries = (_a = signerOrOptions.libraries) !== null && _a !== void 0 ? _a : {};
                }
                else {
                    signer = signerOrOptions;
                }
                if (artifact.bytecode === "0x") {
                    throw new Error("You are trying to create a contract factory for the contract ".concat(artifact.contractName, ", which is abstract and can't be deployed.\nIf you want to call a contract using ").concat(artifact.contractName, " as its interface use the \"getContractAt\" function instead."));
                }
                return [4 /*yield*/, collectLibrariesAndLink(artifact, libraries)];
            case 1:
                linkedBytecode = _b.sent();
                return [2 /*return*/, new ethers_1.ethers.ContractFactory(artifact.abi, linkedBytecode || artifact.bytecode, signer || (new ethers_1.ethers.providers.Web3Provider(ganacheProvider)).getSigner())];
        }
    });
}); };
exports.getContractFactoryFromArtifact = getContractFactoryFromArtifact;
var getContractAtFromArtifact = function (artifact, address, signerOrOptions) {
    if (signerOrOptions === void 0) { signerOrOptions = null; }
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isArtifact(artifact)) {
                        throw new Error("You are trying to create a contract factory from an artifact, but you have not passed a valid artifact parameter.");
                    }
                    return [4 /*yield*/, getContractAt(artifact.abi, address, signerOrOptions)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
exports.getContractAtFromArtifact = getContractAtFromArtifact;
